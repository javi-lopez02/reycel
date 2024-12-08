import { VscSend } from "react-icons/vsc"

function FormComment({onSubmit}: {onSubmit: React.FormEventHandler<HTMLFormElement>}) {

  return (
    <form className="mt-2 flex items-center pb-3" onSubmit={onSubmit}>
      <input
        type="text"
        name="comment"
        placeholder="Write a comment..."
        className="w-full pl-4 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-7 md:right-14">
        <VscSend className=" h-8 w-8 hover:text-blue-500" />
      </button>
    </form>
  )
}

export default FormComment