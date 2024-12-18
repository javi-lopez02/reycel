import { Select, SelectItem } from "@nextui-org/react";
import useCategory from "../../customHooks/useCategory";
import { toast } from "sonner";

export default function Selected() {
  const { category, error } = useCategory();

  return (
    <>
      <Select
        name="selected"
        isRequired
        className="max-w-xs"
        labelPlacement="outside"
        label="Categoría:"
        placeholder="Selecciona una categoría"
      >
        {category &&
          category.map((item) => (
            <SelectItem key={item.id}>{item.name}</SelectItem>
          ))}
      </Select>
      {error && error.map((err) => toast.error(err))}
    </>
  );
}
