import { toast } from "sonner";
import {
  notificationDeleteAllRequest,
  notificationDeleteRequest,
  notificationReadAllRequest,
  notificationReadRequest,
} from "../services/notification";
import { useNotificationStore } from "../store/useNotificationStore";

export const checkNotification = (id: number) => {
  const { checkNotification } = useNotificationStore();
  notificationReadRequest(id).catch((error) => {
    toast.error("Error al leer la notificación");
    console.log(error);
  });
  checkNotification(id);
};

export const checkNotificationAll = () => {
  const { checkNotificationAll } = useNotificationStore();
  notificationReadAllRequest().catch((error) => {
    toast.error("Error al leer las notificaciones");
    console.log(error);
  });
  checkNotificationAll();
};

export const deleteNotification = (id: number) => {
  const { deleteNotification } = useNotificationStore();
  notificationDeleteRequest(id).catch((error) => {
    toast.error("Error al eliminar la notificación");
    console.log(error);
  });
  deleteNotification(id);
};

export const deleteNotificationAll = () => {
  const { deleteNotificationAll } = useNotificationStore();
  notificationDeleteAllRequest().catch((error) => {
    toast.error("Error al eliminar las notificaciones");
    console.log(error);
  });
  deleteNotificationAll();
};
