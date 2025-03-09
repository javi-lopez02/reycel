import {
  AreaChart,
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getPaymentsRequest } from "../../services/analytics";
import { PaymentAnalytics } from "../../type";
import { toast } from "sonner";

export function MonthlyEarnings() {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });
  const [payments, setPayments] = useState<PaymentAnalytics[] | null>(null);
  useEffect(() => {
    const startDate = value.from?.toUTCString();
    const endDate = value.to?.toUTCString();

    if (startDate && endDate) {
      getPaymentsRequest(startDate, endDate)
        .then((res) => {
          setPayments(res.data.chartData);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al cargar el esatdo de los pagos");
        });
    }
  }, [value.from, value.to]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Ganancias del Mes
          </h3>
          <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            $34,567
          </p>
        </div>
        <DateRangePicker
          className=" max-w-md"
          value={value}
          onValueChange={setValue}
          locale={es}
          selectPlaceholder="Seleccionar"
          color="rose"
        >
          <DateRangePickerItem
            key="lastYear"
            value="lastYear"
            from={new Date(new Date().getFullYear() - 1, 0, 1)}
            to={new Date(new Date().getFullYear() - 1, 11, 31)}
          >
            Año anterior
          </DateRangePickerItem>
          <DateRangePickerItem
            key="half"
            value="half"
            from={new Date(new Date().getFullYear(), 0, 1)}
            to={new Date(new Date().getFullYear(), 11, 31)}
          >
            Año Presente
          </DateRangePickerItem>
        </DateRangePicker>
      </div>
      {payments && value.from && value.to && (
        <AreaChart
          data={payments}
          index="date"
          categories={["total"]}
          colors={["red"]}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          className="-mb-2 mt-8 h-48"
        />
      )}
    </>
  );
}
