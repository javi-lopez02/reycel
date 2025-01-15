import { DonutChart, Legend } from "@tremor/react";

const sales = [
  {
    name: "New York",
    sales: 980,
  },
  {
    name: "London",
    sales: 456,
  },
  {
    name: "Hong Kong",
    sales: 390,
  },
  {
    name: "San Francisco",
    sales: 240,
  },
  {
    name: "Singapore",
    sales: 190,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export function PaymentStatus() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6 ">
        <div className="w-full flex justify-start">
          <h3 className="text-black/50">Estados de los pagos</h3>
        </div>

        <DonutChart
          data={sales}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="w-40"
        />
        <Legend
          categories={[
            "New York",
            "London",
            "Hong Kong",
            "San Francisco",
            "Singapore",
          ]}
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="max-w-xs"
        />
      </div>
    </>
  );
}
