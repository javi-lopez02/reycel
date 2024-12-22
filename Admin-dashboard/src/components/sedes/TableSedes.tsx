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
    User,
    Pagination,
    Selection,
    SortDescriptor,
    Tooltip,
    //   Spinner,
    useDisclosure,
  } from "@nextui-org/react";
  import {
    ChevronDownIcon,
    DeleteIcon,
    EditIcon,
    PlusIcon,
    SearchIcon,
  } from "../Icons";
  import { sedes } from "../Sedes";
import ModalAddSede from "./ModalAddSede";
  
  export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };
  
  export function Capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  }
  
  const columns = [
    { name: "IMAGEN", uid: "image", sortable: true },
    { name: "TELEFONO", uid: "phone", sortable: true },
    { name: "TRABAJADOR", uid: "worker", sortable: true },
    { name: "DIRECCION", uid: "direction" },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  const INITIAL_VISIBLE_COLUMNS = [
    "image",
    "phone",
    "worker",
    "direction",
    "actions",
  ];
  
  type Sede = (typeof sedes)[0];
  
  export default function TableSedes() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const [filterValue, setFilterValue] = useState("");
  
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
      new Set(INITIAL_VISIBLE_COLUMNS)
    );
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
      let filteredsedes = [...sedes];
  
      if (hasSearchFilter) {
        filteredsedes = filteredsedes.filter((sede) =>
          sede.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      
      return filteredsedes;
    }, [filterValue, hasSearchFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = useMemo(() => {
      return [...items].sort((a: Sede, b: Sede) => {
        const first = a[sortDescriptor.column as keyof Sede] as number;
        const second = b[sortDescriptor.column as keyof Sede] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = useCallback((sedes: Sede, columnKey: Key) => {
      const cellValue = sedes[columnKey as keyof Sede];
  
      switch (columnKey) {
        case "image":
          return (
            <User
              avatarProps={{ radius: "lg", src: sedes.worker }}
              name={sedes.name}
            />
          );
        case "phone":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "worker":
          return (
            <User
              avatarProps={{ radius: "lg", src: sedes.worker }}
              name={sedes.workername}
            />
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip content="Edit Sede">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Sede">
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
                Nueva Sede
              </Button>
              <ModalAddSede isOpen={isOpen} onClose={onClose} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {sedes.length} sedes
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
  