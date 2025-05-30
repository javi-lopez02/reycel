import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react";
import { es } from "date-fns/locale";
import { useState } from "react";

export function DatePicker() {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  console.log(value)
  return (
    <DateRangePicker
      className=" max-w-md"
      value={value}
      onValueChange={setValue}
      locale={es}
      selectPlaceholder="Seleccionar"
      color="rose"
    >
      <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
        Año transcurrido
      </DateRangePickerItem>
      <DateRangePickerItem
        key="half"
        value="half"
        from={new Date(2023, 0, 1)}
        to={new Date(2023, 5, 31)}
      >
        Primer semestre
      </DateRangePickerItem>
    </DateRangePicker>
  );
}
