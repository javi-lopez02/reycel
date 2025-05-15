import { FC } from "react"

interface Comment {
  client: {
    baseUser: {
      username: string;
    };
  };
  content: string;
  createdAt: Date;
}


const Comment: FC<Comment> = (comment) => {
  return (
    <div className="mt-2 bg-neutral-100 rounded-md px-4 py-1">
      <p className="text-gray-800 text-lg font-bold">{comment.client.baseUser.username}</p>
      <p className="text-gray-600 mx-3">
        {comment.content}
      </p>
    </div>
  )
}

export default Comment