import Card from "../components/AboutUs/Card";
import '../index.css'

export default function AboutUs() {
  return (
    <div className="flex flex-col p-20 items-center justify-between gap-8">
      <h1 className="font-bold text-4xl md:text-5xl text-blue-300 text_color">Nuestras Sedes</h1>
      <div className="grid min-w-full xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {[...Array(9)].map((_, index) => {
          return <Card 
          key={index} 
          image="https://via.placeholder.com/400"
          address="Calle Daoiz E/ San Carlos y Compostela #10278"
          phone={53535353}
          municipe="Matanzas"
          />;
        })}
      </div>
    </div>
  );
}
