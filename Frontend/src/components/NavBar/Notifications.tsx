import { Popover, PopoverTrigger, PopoverContent, Badge } from "@heroui/react";
import { IoIosNotifications } from "react-icons/io";
import NotificationCard from "./NotificationCard";
import { useNotificationStore } from "../../store/useNotificationStore";

export default function Notifications() {
  const { notifications } = useNotificationStore();

  const notificationsNotRead = notifications.filter((notification) => !notification.isRead);

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <button className="sm:p-2 flex items-center justify-center border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
          <Badge
            color="danger"
            content={notificationsNotRead.length}
            isInvisible={notificationsNotRead.length === 0}
            size="sm"
          >
            <IoIosNotifications size={25} />
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="block min-w-full py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Notificaciones
        </div>
        <div>
          {notifications.length === 0 && (
            <div className="w-full flex items-center justify-center p-4">
              <span className="font-semibold text-lg text-neutral-600">No hay notificaiones pendinetes</span>
            </div>
          )}
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} {...notification} />
          ))}
        </div>
        {/* <a
          href="#"
          className="flex py-2 min-w-full rounded-xl items-center justify-center font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-500 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div className="inline-flex items-center ">
            <svg
              aria-hidden="true"
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            View all
          </div>
        </a> */}
      </PopoverContent>
    </Popover>
  );
}
