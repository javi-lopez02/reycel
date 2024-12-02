import Card from "../components/AboutUs/Card";
import "../index.css";

export default function AboutUs() {
  return (
    <div className="flex flex-col p-20 items-center justify-between gap-8">
      <h1 className="text-3xl font-semibold">Nuestras Sedes</h1>
      <div className="grid min-w-full xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {[...Array(9)].map((_, index) => {
          return (
            <Card
              key={index}
              image="https://cdn.pixabay.com/photo/2023/03/06/23/44/marble-7834693_1280.jpg"
              address="Calle Daoiz E/ San Carlos y Compostela #10278"
              phone={53535353}
              municipe="Matanzas"
            />
          );
        })}
      </div>
    </div>
  );
}
