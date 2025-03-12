import { Card, SparkAreaChart } from "@tremor/react";
import { FC } from "react";

interface Props {
  chartdata: {
    month: string;
    total: string;
  }[];
  total: number;
  growth: number;
  title: string;
}

export const CardGeneralData:FC<Props> = ({chartdata, total, growth, title}) => {
  return (
    <Card className="mx-auto flex max-w-lg flex-col justify-between px-4 py-3.5">
      <div className="flex items-center space-x-2.5">
        
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {title}
        </span>
      </div>
      <div className="flex justify-center items-center space-x-3 pt-4">
        <SparkAreaChart
          data={chartdata}
          categories={["total"]}
          index={"month"}
          colors={["emerald"]}
          className="h-8 w-20 sm:h-10 sm:w-36"
        />
        <div className="flex items-center space-x-2.5">
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {total}
          </span>
          <span className={`rounded ${growth < 0 ? "bg-red-400": "bg-emerald-400"} px-2 py-1 text-tremor-default font-medium text-white`}>
            {growth}%
          </span>
        </div>
      </div>
    </Card>
  );
};
