import { Card, DateRangePicker } from "@tremor/react";
import { CardGeneralData } from "./CardGeneralData";
import { MonthlyEarnings } from "./MonthlyEarnings";
import { PaymentStatus } from "./Paymnets/PaymentStatus";
import { ProductAnalytics } from "./ProductAnalytics";
import useAnalytics from "../../customHooks/useAnalytics";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";

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
      <section className="pt-10 px-10">
        <section className="w-full flex ">
          {analytics?.dataProductsByMonth !== undefined && (
            <CardGeneralData
              title="Productos"
              chartdata={analytics?.dataProductsByMonth}
              growth={analytics.growthProducts}
              total={analytics.totalProduct}
            />
          )}
          {analytics?.dataUsersByMonth !== undefined && (
            <CardGeneralData
              title="Usuario"
              chartdata={analytics?.dataUsersByMonth}
              growth={analytics.growthUsers}
              total={analytics.totalUser}
            />
          )}
          {analytics?.dataCategoriesByMonth !== undefined && (
            <CardGeneralData
              title="Categorias"
              chartdata={analytics?.dataCategoriesByMonth}
              growth={analytics.growthCategories}
              total={analytics.totalCategory}
            />
          )}
        </section>

        <section className="pt-10">
          <Card>
            <MonthlyEarnings />
          </Card>
        </section>

        <section className="pt-10 flex flex-col">
          <div className="flex justify-end items-center">
            <DateRangePicker className="max-w-md" />
          </div>
          <div className="pt-3 w-full flex justify-center items-center space-x-5">
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
          <Card className="bg-neutral-200/50  pt-4">
            <div className="flex justify-end items-center">
              <DateRangePicker className="max-w-md" />
            </div>
            <div className="flex justify-between items-center pt-4">
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
