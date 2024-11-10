import { useEffect, useState } from "react";
import Card from "../components/Card";
import { productRequest } from '../services/product'
import { Products } from '../types.d'
import SideBar from "../components/Sidebar/SideBar";

export default function Shop() {
  const [protucts, setProtucts] = useState<Array<Products>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    productRequest()
      .then((res) => {
        setProtucts(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex justify-normal items-start hide-scrollbar overflow-y-scroll ">
      <div className="w-2/12 h-full hidden xl:flex flex-col top-0 left-0">
        <div className="fixed">
          <SideBar />
        </div>
      </div>

      <div className="w-full listProduct pt-2 px-2">
        {
          !loading && protucts.length >= 1 && (
            protucts.map((protuct) => {
              return (
                <Card
                  key={protuct.id}
                  image={protuct.imagen}
                  title={protuct.name}
                  price={protuct.price}
                  description={protuct.description}
                />
              )
            })
          )
        }
        {
          loading && (
            <h1 className="" >Cargando ...</h1>
          )
        }
      </div>

    </div>
  );
}
