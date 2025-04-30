const Card = () => {
  return (
    <div className="flex flex-col w-full mt-4 justify-center items-center">
      <h1 className="font-semibold text-lg">Desarrolladores</h1>
      <div className="flex md:flex-row flex-col w-full justify-evenly">
        <div className="flex flex-wrap items-center justify-center flex-col cursor-pointer">
          <img src="" className="w-14 h-14 rounded-full" />
          <h4 className="text-base text-gray-800 font-bold mt-3">
            Brayan Betancourt Céspedes
          </h4>
          <p className="text-xs text-gray-500 mt-1">brayancespedes57@gmail.com</p>
          <p className="text-xs text-gray-500 mt-1">+5354383812</p>
        </div>
        <div className="flex flex-wrap items-center justify-center flex-col cursor-pointer">
          <img src="" className="w-14 h-14 rounded-full" />
          <h4 className="text-base text-gray-800 font-bold mt-3">
            Maylon Javier Lopez Perez
          </h4>
          <p className="text-xs text-gray-500 mt-1">mjlphone@gmail.com</p>
          <p className="text-xs text-gray-500 mt-1">+5358683245</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
