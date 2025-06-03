import {
  RatingChange,
  Rating as RatingStart,
  RoundedStar,
} from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";


function Star({ value, onChange, ratingString=true }: { value: number; onChange: RatingChange, ratingString?: boolean }) {
  return (
    <div className="flex items-center mt-2">
      <RatingStart
        style={{ maxWidth: 200 }}
        value={value}
        onChange={onChange}
        itemStyles={{
          itemShapes: RoundedStar,
          activeFillColor: "#ffa600",
          inactiveFillColor: "#f4c137",
        }}
      />
      {ratingString && <span className="text-gray-600 ml-2">{value} de 5</span>}
    </div>
  );
}

export default Star;
