import { Card, DateRangePicker } from "@tremor/react";
import { CardGeneralData } from "./CardGeneralData";
import { MonthlyEarnings } from "./MonthlyEarnings";
import { PaymentStatus } from "./Paymnets/PaymentStatus";
import { ProductAnalytics } from "./ProductAnalytics";
import useAnalytics from "../../customHooks/useAnalytics";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";

export default function Stadistic() {
  const { analytics, error, loading } = useAnalytics();

  return (
    <>
      {error && toast.error(error)}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      )}
      <section className="px-2 ml-0 lg:px-5 lg:ml-5">
        <section className="grid gap-4 sm:grid-cols-2 ">
          {analytics?.dataProductsByMonth !== undefined && (
            <CardGeneralData
              title="Productos"
              chartdata={analytics?.dataProductsByMonth}
              growth={Number(analytics.growthProducts)}
              total={analytics.totalProduct}
            />
          )}
          {analytics?.dataUsersByMonth !== undefined && (
            <CardGeneralData
              title="Usuario"
              chartdata={analytics?.dataUsersByMonth}
              growth={Number(analytics.growthUsers)}
              total={analytics.totalUser}
            />
          )}
        </section>

        <section className="pt-5">
          <Card>
            <MonthlyEarnings />
          </Card>
        </section>

        <section className="pt-10 flex flex-col">
          <div className="flex justify-end items-center">
            <DateRangePicker className="max-w-md" />
          </div>
          <div className="pt-3 w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <PaymentStatus />
            </Card>
            <Card>
              <PaymentStatus />
            </Card>
            <Card>
              <PaymentStatus />
            </Card>
            <Card>
              <PaymentStatus />
            </Card>
          </div>
        </section>

        <section className="pt-10">
          <Card className="bg-neutral-200/50 pt-4">
            <div className="flex justify-end items-center pb-2">
              <DateRangePicker className="max-w-md" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <ProductAnalytics />
              <ProductAnalytics />
              <ProductAnalytics />
              <ProductAnalytics />
            </div>
          </Card>
        </section>
      </section>
    </>
  );
}
