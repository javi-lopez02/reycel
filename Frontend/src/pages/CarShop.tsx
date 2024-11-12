import CarCard from "../components/CarCard";

export default function CarShop() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
    {
      [...Array(20)].map((_,index)=>{
        return <CarCard
        key={index}
        image="https://via.placeholder.com/400"
        title="Celular Ejemplo"
        price="$299.99"
        description="Propiedades"
        especif="Especificaciones"
      />
      })
    }       
    </div>
  );
}
