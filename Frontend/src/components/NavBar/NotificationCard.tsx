import { Badge } from "@heroui/react";
import { FC } from "react";
import FormatDate from "./FormatDate";

interface NotificationsPros {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationCard: FC<NotificationsPros> = ({
  message,
  type,
  isRead,
  createdAt,
}) => {
  return (
    <div className="flex py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600">
      <div className="flex-shrink-0">
        <Badge color="danger" isInvisible={isRead} shape="circle">
          <img
            className="w-11 h-11 rounded-full"
            src="public/logo.webp"
            alt="Reycel"
          />
        </Badge>
      </div>
      <div className="pl-3 w-full">
        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {type}
          </span>{" "}
          {message}
        </div>
        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
          <FormatDate date={createdAt} />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
