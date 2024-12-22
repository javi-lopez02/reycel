import { FC } from "react"

interface Comment {
  User: {
    username: string;
  }
  content: string,
  createdAt: Date
}


const Comment: FC<Comment> = (comment) => {
  return (
    <div className="mt-2 bg-neutral-100 rounded-md px-4 py-1">
      <p className="text-gray-800 text-lg font-bold">{comment.User.username}</p>
      <p className="text-gray-600 mx-3">
        {comment.content}
      </p>
    </div>
  )
}

export default Comment