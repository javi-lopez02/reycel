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
    <div className="mt-2">
      <p className="text-gray-700 font-medium">{comment.User.username}</p>
      <p className="text-gray-600">
        {comment.content}
      </p>
    </div>
  )
}

export default Comment