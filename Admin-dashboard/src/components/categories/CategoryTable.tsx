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
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  // Spinner,
} from "@heroui/react";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
} from "../Icons";
import { Category } from "../../type";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../api/queries/categgories";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function Capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "CANTIDAD DE PRODUCTOS", uid: "productquantity", sortable: true },
  { name: "GANACIA POR PRODUCTO", uid: "profitsBySell", sortable: true },
  { name: "FECHA DE CREACION", uid: "createdAt", sortable: true },
  { name: "GANANCIA POR VENTA DEL TRABAJADOR", uid: "profits" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "productquantity",
  "profitsBySell",
  "createdAt",
  "actions",
];

export default function CategoryTable() {
  const { categoryQuery, deleteCategory } = useCategory();
  const { data: category, error, isError, isLoading } = categoryQuery;
  const navigate = useNavigate();

  const { user } = useAuth();

  const [filterValue, setFilterValue] = useState("");

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const handleAddCategory = () => {
    navigate(`new`);
  };

  const handleEditCategory = (category: Category) => {
    navigate(`${category.id!}/edit`);
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!category) {
      return [];
    }
    let filteredcategories = [...category];

    if (hasSearchFilter) {
      filteredcategories = filteredcategories.filter((Category) =>
        Category.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredcategories;
  }, [category, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems].sort((a: Category, b: Category) => {
      const first = a[sortDescriptor?.column as keyof Category] as string;
      const second = b[sortDescriptor?.column as keyof Category] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor?.direction === "descending" ? -cmp : cmp;
    });
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sorted.slice(start, end);
  }, [
    filteredItems,
    page,
    rowsPerPage,
    sortDescriptor?.column,
    sortDescriptor?.direction,
  ]);

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

  const handleDelete = (id: string) => {
    deleteCategory(id)
      .then(() => {
        toast.success("Categoría eliminado con exito");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al eliminar el producto");
      });
  };

  const renderCell = useCallback((category: Category, columnKey: Key) => {
    const cellValue = category[columnKey as keyof Category];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{category.name}</p>
          </div>
        );
      case "productquantity":
        return (
          <div className="flex ">
            <p className="text-bold text-small capitalize">
              {category._count?.products}
            </p>
          </div>
        );
      case "profitsBySell":
        return (
          <div className="flex ">
            <p className="text-bold text-small capitalize">
              {category.profitsBySell}
            </p>
          </div>
        );
      case "profits":
        return (
          <div className="flex ">
            <p className="text-bold text-small capitalize">
              {category.profitsBySell}
            </p>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex ">
            <p className="text-bold text-small capitalize">
              {formatearFecha(category.createdAt!)}
            </p>
          </div>
        );
      case "actions":
        return user?.role === "OWNER" ? (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Edit Category" color="success">
              <button
                onClick={() => handleEditCategory(category)}
                className="text-lg text-success cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </button>
            </Tooltip>
            {category._count?.products === 0 && (
              <Tooltip color="danger" content="Delete Category">
                <button
                  onClick={() => {
                    handleDelete(category.id!);
                  }}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </button>
              </Tooltip>
            )}
          </div>
        ) : (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Edit Category" color="success">
              <button
                onClick={() =>
                  toast.error("Solo disponible para el Administrador")
                }
                className="text-lg text-success cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </button>
            </Tooltip>

            <Tooltip color="danger" content="Delete Category">
              <button
                onClick={() => {
                  toast.error("Solo disponible para el Administrador");
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return String(cellValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end ">
          <Input
            isClearable
            color="success"
            className="w-full sm:max-w-[44%]"
            placeholder="Búsqueda ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 w-full justify-center sm:w-auto ">
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
              color="success"
              endContent={<PlusIcon />}
              onPress={handleAddCategory}
            >
              Nueva Categoria
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {category?.length} Categorias
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    category?.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 sm:px-2 flex sm:flex-row flex-col sm:justify-between justify-center items-center gap-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
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
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        className="z-0"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[615px]",
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
          isLoading={isLoading}
          // loadingContent={<Spinner color="white" />}
          emptyContent={"No categories found"}
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
    </>
  );
}
