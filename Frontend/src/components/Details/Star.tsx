import { RatingChange, Rating as RetingStart, RoundedStar } from "@smastrom/react-rating";


function Star({ value, onChange }: { value: number, onChange: RatingChange }) {

  return (
    <div className="flex items-center mt-2">
      <RetingStart style={{ maxWidth: 200 }} value={value} onChange={onChange} itemStyles={{
        itemShapes: RoundedStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
      }} />
      <span className="text-gray-600 ml-2">{value} de 5</span>
    </div>
  )
}

export default Star