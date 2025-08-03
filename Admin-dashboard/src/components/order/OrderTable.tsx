import {
  ChangeEvent,
  Key,
  lazy,
  Suspense,
  SVGProps,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { ChevronDownIcon, EyeIcon, PlusIcon, SearchIcon } from "../Icons";
import { toast } from "sonner";
import { Order } from "../../type";
import { useNavigate } from "react-router-dom";
import { useOrderQuery } from "../../api/queries/order";
import { useDebouncedCallback } from "use-debounce";
const ModalProductsView = lazy(() => import("./ModalProductsView"));

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function Capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const columns = [
  { name: "USUARIO", uid: "username" },
  { name: "PRECIO TOTAL", uid: "totalAmount", sortable: true },
  { name: "CANTIDAD DE PRODUCTOS", uid: "productquantity" },
  { name: "ESTADO", uid: "pending", sortable: true },
  { name: "FECHA", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "COMPLETADO", uid: "false" },
  { name: "PENDIENTE", uid: "true" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  false: "success",
  true: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "username",
  "totalAmount",
  "productquantity",
  "createdAt",
  "pending",
  "actions",
];

export default function OrderTable() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filterValue, setFilterValue] = useState("");

  const [orderId, setOrderId] = useState<string>("");

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [page, setPage] = useState(1);

  const { orderQuery } = useOrderQuery();

  const { data, isLoading, isError, error } = orderQuery({
    filterValue,
    page,
    rowsPerPage,
    sortDescriptor,
  });

  const orders = data?.order;

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!orders) {
      return [];
    }

    let filteredOrders = [...orders];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredOrders = filteredOrders.filter((order) =>
        Array.from(statusFilter).includes(String(order.pending))
      );
    }

    return filteredOrders;
  }, [orders, statusFilter, filterValue]);

  const pages = data?.metaData.totalPages;

  const formatearFecha = (isoString: string) => {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const fecha = new Date(isoString);

    const dia = fecha.getUTCDate();
    const mes = meses[fecha.getUTCMonth()];
    const anio = fecha.getUTCFullYear();

    return `${dia} ${mes} ${anio}`;
  };

  const renderCell = useCallback(
    (orders: Order, columnKey: Key) => {
      const cellValue = orders[columnKey as keyof Order];

      switch (columnKey) {
        case "username":
          return orders.client ? (
            <User
              avatarProps={{ radius: "lg", src: orders.client.baseUser.image }}
              name={orders.client?.baseUser.username}
            />
          ) : (
            <User
              avatarProps={{ radius: "lg", src: orders.admin.baseUser.image }}
              name={orders.admin?.baseUser?.username}
            />
          );
        case "totalAmount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {orders.totalAmount}$
              </p>
            </div>
          );
        case "pending":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[String(orders.pending)]}
              size="sm"
              variant="flat"
            >
              {orders.pending ? "Pendiente" : "Completada"}
            </Chip>
          );
        case "productquantity":
          return (
            <span className="font-semibold flex justify-center">
              {orders._count.orderItems}
            </span>
          );
        case "createdAt":
          return (
            <div>
              <p className="text-bold text-small capitalize">
                {formatearFecha(orders.createdAt)}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip content="Details" color="success">
                <span className="text-lg text-success cursor-pointer active:opacity-50">
                  <EyeIcon
                    onClick={() => {
                      onOpen();
                      setOrderId(orders.id);
                    }}
                    color="success"
                  />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return String(cellValue);
      }
    },
    [onOpen]
  );

  const onNextPage = useCallback(() => {
    if (page < pages!) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const debounced = useDebouncedCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, 500);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    const handleNavigate = () => {
      navigate("new");
    };
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end ">
          <Input
            isClearable
            color="warning"
            className="w-full sm:max-w-[44%]"
            placeholder="Búsqueda..."
            startContent={<SearchIcon />}
            onClear={() => onClear()}
            onValueChange={debounced}
          />
          <div className="flex gap-3 w-full justify-center sm:w-auto ">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {Capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {Capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="warning"
              endContent={<PlusIcon />}
              onPress={handleNavigate}
            >
              Nueva Orden
            </Button>
            {/* <ModalAddOrder isOpen={isOpen} onClose={onClose} /> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {orders?.length} Ordenes
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por páginas:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    debounced,
    statusFilter,
    visibleColumns,
    orders?.length,
    onRowsPerPageChange,
    onClear,
    navigate,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="warning"
          page={page}
          total={pages!}
          onChange={setPage}
        />
        <div className=" justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="md"
            variant="flat"
            onPress={onPreviousPage}
            color="danger"
            className="mx-2"
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="md"
            variant="flat"
            onPress={onNextPage}
            color="success"
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <>
      {isError && toast.error(error.message)}
      {isOpen && (
        <Suspense
          fallback={
            <div className="w-full flex justify-center fixed pt-2">
              <Spinner color="warning" />
            </div>
          }
        >
          <ModalProductsView isOpen={isOpen} onClose={onClose} id={orderId} />
        </Suspense>
      )}
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="z-0"
        classNames={{
          wrapper: "h-[600px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === "actions" ||
                column.uid === "productquantity" ||
                column.uid === "totalAmount"
                  ? "center"
                  : "start"
              }
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="warning" />}
          emptyContent={"No se encontraron ordenes"}
          items={filteredItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
