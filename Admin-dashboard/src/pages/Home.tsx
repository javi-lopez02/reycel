import { Rating } from "react-simple-star-rating";
import Stadistic from "../components/home/Stadistic";

function Home() {
  return (
    <div className="pt-16 ">
      <Stadistic />
      <Rating initialValue={5}/>
    </div>
  );
}

export default Home;
