import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
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
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  User,
  Spinner,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from "../Icons";
import { Products as Product } from "../../type";
import useProduct from "../../customHooks/useProduct";
import { toast } from "sonner";

export function Capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "CATEGORIA", uid: "category", sortable: true },
  { name: "PRECIO", uid: "price", sortable: true },
  { name: "RATINGAVERAGE", uid: "ratingAverage", sortable: true },
  { name: "CANTIDAD", uid: "quantity", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "price",
  "category",
  "quantity",
  "actions",
  "ratingAverage",
];

export default function ProductTable() {
  const { category: categoryOptions, products, loading, error } = useProduct();
  const [filterValue, setFilterValue] = useState("");

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [categoryFilter, setcategoryFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!products) {
      return [];
    }
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.category.name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    if (
      categoryFilter !== "all" &&
      Array.from(categoryFilter).length !== categoryOptions?.length
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(categoryFilter).includes(product.category.id)
      );
    }
    return filteredProducts;
  }, [
    products,
    hasSearchFilter,
    categoryFilter,
    categoryOptions?.length,
    filterValue,
  ]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor?.column as keyof Product] as number;
      const second = b[sortDescriptor?.column as keyof Product] as number;
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

  const renderCell = useCallback((product: Product, columnKey: Key) => {
    const cellValue = product[columnKey as keyof Product];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: product.imagen }}
            description={
              <Tooltip content={product.description}>
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.description}
                </span>
              </Tooltip>
            }
            name={
              <Tooltip content={String(cellValue)}>
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {String(cellValue)}
                </span>
              </Tooltip>
            }
          />
        );
      case "category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {product.category.name} {/* Accede a una subpropiedad */}
            </p>
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col ml-2">
            <p className="text-bold text-small capitalize">${product.price}</p>
          </div>
        );
      case "ratingAverage":
        return (
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 fill-current ${
                      product.ratingAverage - 0.5 > index
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.368 6.91l6.564-.955L10 0l3.068 5.955 6.564.955-4.878 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.ratingAverage} de 5
              </span>
            </div>
          </div>
        );
      case "quantity":
        return (
          <Chip
            className="capitalize"
            size="sm"
            variant="dot"
            color={product.inventoryCount <= 3 ? "danger" : "success"}
          >
            {String(product.inventoryCount)}
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
            <Tooltip content="Edit product">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return String(cellValue); // Convierte el valor a string como fallback
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
                  Categoría
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="max-h-96 overflow-y-auto"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={categoryFilter}
                selectionMode="multiple"
                onSelectionChange={setcategoryFilter}
              >
                {categoryOptions &&
                  categoryOptions.map((category) => (
                    <DropdownItem key={category.id} className="capitalize">
                      {Capitalize(category.name)}
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
            <Button color="primary" endContent={<PlusIcon />}>
              Nuevo Producto
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products?.length} productos
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
    onSearchChange,
    categoryFilter,
    categoryOptions,
    visibleColumns,
    products?.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
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
    <>
      {error && error.map((err) => toast.error(err))}
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
              align={
                column.uid === "actions" || column.uid === "ratingAverage"
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
          isLoading={loading}
          loadingContent={<Spinner color="success" />}
          emptyContent={"No products found"}
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
