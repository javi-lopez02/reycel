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
    from: new Date(2023, 1, 1),
    to: new Date(),
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
            key="ytd"
            value="ytd"
            from={new Date(2023, 0, 1)}
          >
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
      </div>
      {payments && value.from && value.to &&(
        <AreaChart
          className="mt-4 h-72"
          data={payments}
          index="date"
          categories={[
            value.from.toLocaleString("default", {
              month: "long",
              timeZone: "UTC",
            }),
            value.to.toLocaleString("default", {
              month: "long",
              timeZone: "UTC",
            })
          ]}
          colors={["blue", "red"]}
          yAxisWidth={30}
          //onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
      )}
    </>
  );
}
