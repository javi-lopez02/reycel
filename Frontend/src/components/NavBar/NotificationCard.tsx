import { FC } from "react";
import FormatDate from "./FormatDate";
import { Badge } from "@heroui/react";
import { IoMdCheckmark } from "react-icons/io";
import { useAuth } from "../../context/auth.context";
import { MdClose, MdOutlineNotificationsActive } from "react-icons/md";

interface NotificationsPros {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationCard: FC<NotificationsPros> = ({
  id,
  message,
  type,
  isRead,
  createdAt,
}) => {
  const { checkNotification } = useAuth();

  const handleCheckNotification = () => {
    if (!isRead) {
      checkNotification(id);
    }
  };

  return (
    <div
      className={`flex py-3 px-4 rounded-xl transition-colors cursor-pointer ${
        !isRead ? "bg-blue-50" : ""
      } hover:bg-gray-100 dark:hover:bg-gray-600`}
      onClick={handleCheckNotification}
    >
      <div className="flex-shrink-0">
        <Badge
          isOneChar
          color={
            type === "PAYMENT_SUCCESS"
              ? "success"
              : type === "PAYMENT_FAILED"
              ? "danger"
              : "primary"
          }
          content={
            type === "PAYMENT_SUCCESS" ? (
              <IoMdCheckmark className="text-white" />
            ) : type === "PAYMENT_FAILED" ? (
              <MdClose />
            ) : (
              <MdOutlineNotificationsActive />
            )
          }
          placement="top-right"
        >
          <img
            className="w-11 h-11 rounded-full"
            src="public/logo.webp"
            alt="Reycel"
          />
        </Badge>
      </div>
      <div className="pl-3 w-full flex items-start gap-3">
        <div className="flex-1">
          <p
            className={`text-sm font-medium ${
              !isRead ? "text-gray-900" : "text-gray-600"
            }`}
          >
            {type === "PAYMENT_SUCCESS"
              ? "Pago confirmado"
              : type === "PAYMENT_FAILED"
              ? "Pago fallido"
              : "Notificación"}
          </p>
          <p className="text-sm text-gray-500">{message}</p>
          <p className="text-xs text-blue-400 mt-1">
            <FormatDate date={createdAt} />
          </p>
        </div>
        {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
      </div>
    </div>
  );
};

export default NotificationCard;
