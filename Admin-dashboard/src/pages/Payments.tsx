import PaymentsMethodTable from "../components/pagos/PaymentsMethodTable";
import PaymentsTable from "../components/pagos/PaymentsTable";

export default function Payments() {
  return (
    <div className="pt-20 p-16 flex flex-col gap-y-20 bg-neutral-100 h-full"> 
      <PaymentsTable />
      <PaymentsMethodTable />
    </div>
  );
}
