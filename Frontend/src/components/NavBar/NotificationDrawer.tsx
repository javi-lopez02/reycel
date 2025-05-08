import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiCheck, BiX } from "react-icons/bi";
import FormatDate from "./FormatDate";
import { useNotificationStore } from "../../store/useNotificationStore";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationsPros {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "PAYMENT_SUCCESS":
      return <IoIosCheckmarkCircle className="text-green-500" size={30} />;
    case "PAYMENT_FAILED":
      return <IoMdCloseCircle className="text-red-500" size={30} />;
    case "NOTIFICATION":
      return (
        <MdOutlineNotificationsActive className="text-blue-500" size={30} />
      );
    default:
      return null;
  }
}

function NotificationItem({
  notification,
  dropdown = false,
}: {
  notification: NotificationsPros;
  dropdown?: boolean;
}) {
  const { checkNotification, deleteNotification } = useNotificationStore();

  const handleCheckNotification = () => {
    if (!notification.isRead) {
      checkNotification(notification.id);
    }
  };
  return (
    <div
      className={`flex items-start gap-4 p-4 ${
        !notification.isRead ? "bg-blue-50" : ""
      } ${dropdown ? "hover:bg-gray-50" : "rounded-lg border border-gray-100"}`}
    >
      <div className="flex-shrink-0">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 uppercase">
          {notification.type === "PAYMENT_SUCCESS"
            ? "Pago confirmado"
            : notification.type === "PAYMENT_FAILED"
            ? "Pago fallido"
            : "Notificación"}
        </h4>
        <p className="text-sm text-gray-500 truncate">{notification.message}</p>
        <span className="text-xs text-gray-400">
          {<FormatDate date={notification.createdAt} />}
        </span>
      </div>
      {!dropdown && (
        <div className="flex-shrink-0 flex gap-2">
          <button className="p-1 hover:bg-gray-200 rounded-full" onClick={handleCheckNotification}>
            <BiCheck className="w-4 h-4 text-green-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full" onClick={() => deleteNotification(notification.id)}>
            <BiX className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const { notifications } = useNotificationStore();

  return (
    <Drawer isOpen={isOpen} size="md" onClose={onClose}>
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Notificaciones
            </DrawerHeader>
            <DrawerBody>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default NotificationDrawer;
