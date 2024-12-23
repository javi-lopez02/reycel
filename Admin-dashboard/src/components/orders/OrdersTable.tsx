import {
    ChangeEvent,
    Key,
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
    //   Spinner,
    useDisclosure,
  } from "@nextui-org/react";
  import {
    ChevronDownIcon,
    DeleteIcon,
    EditIcon,
    EyeIcon,
    PlusIcon,
    SearchIcon,
  } from "../Icons";
  import { orders } from "../Orders";
import ModalAddOrder from "./ModalAddOrder";
  
  export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };
  
  export function Capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  }
  
  const columns = [
    { name: "USUARIO", uid: "username", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "PRECIO TOTAL", uid: "price", sortable: true },
    { name: "PRODUCTOS", uid: "products" },
    { name: "FECHA", uid: "date" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  const statusOptions = [
    { name: "COMPLETADO", uid: "completed" },
    { name: "PENDIENTE", uid: "pendient" },
    { name: "CANCELADO", uid: "canceled" },
  ];
  
  const statusColorMap: Record<string, ChipProps["color"]> = {
    completed: "success",
    pendient: "warning",
    canceled: "danger",
  };
  
  const INITIAL_VISIBLE_COLUMNS = [
    "username",
    "role",
    "price",
    "date",
    "products",
    "status",
    "actions",
  ];
  
  type Order = (typeof orders)[0];
  
  export default function OrdersTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [filterValue, setFilterValue] = useState("");
  
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
      new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: "name",
      direction: "ascending",
    });
  
    const [page, setPage] = useState(1);
  
    const hasSearchFilter = Boolean(filterValue);
  
    const headerColumns = useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) =>
        Array.from(visibleColumns).includes(column.uid)
      );
    }, [visibleColumns]);
  
    const filteredItems = useMemo(() => {
      let filteredorders = [...orders];
  
      if (hasSearchFilter) {
        filteredorders = filteredorders.filter((payment) =>
          payment.username.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions.length
      ) {
        filteredorders = filteredorders.filter((payment) =>
          Array.from(statusFilter).includes(payment.status)
        );
      }
  
      return filteredorders;
    }, [filterValue, statusFilter, hasSearchFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = useMemo(() => {
      return [...items].sort((a: Order, b: Order) => {
        const first = a[sortDescriptor.column as keyof Order] as number;
        const second = b[sortDescriptor.column as keyof Order] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = useCallback((orders: Order, columnKey: Key) => {
      const cellValue = orders[columnKey as keyof Order];
  
      switch (columnKey) {
        case "username":
          return (
            <User
              avatarProps={{ radius: "lg", src: orders.avatar }}
              description={orders.username}
              name={orders.name}
            />
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "products":
          return (
            <div className="flex flex-col gap-1">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
          case "price":
          return (
            <div>
              <p className="text-bold text-small capitalize">${orders.price}</p>
            </div>
          );
        case "date":
          return (
            <div>
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[orders.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit Order">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Order">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);
  
    const onNextPage = useCallback(() => {
      if (page < pages) {
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
  
    const onSearchChange = useCallback((value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    }, []);
  
    const onClear = useCallback(() => {
      setFilterValue("");
      setPage(1);
    }, []);
  
    const topContent = useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Búsqueda por nombre..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
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
                <DropdownTrigger className="hidden sm:flex">
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
              <Button color="success" endContent={<PlusIcon />} onPress={onOpen}>
                Nueva Orden
              </Button>
              <ModalAddOrder isOpen={isOpen} onClose={onClose} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {orders.length} ordenes
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
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      onClear,
      onClose,
      isOpen,
      onOpen,
    ]);
  
    const bottomContent = useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button
              isDisabled={pages === 1}
              size="md"
              variant="flat"
              onPress={onPreviousPage}
              color="danger"
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
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[600px]",
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
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={true}
          // loadingContent={<Spinner color="white" />}
          emptyContent={"No users found"}
          items={sortedItems}
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
    );
  }
  