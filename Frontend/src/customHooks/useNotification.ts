import { toast } from "sonner";
import {
  notificationDeleteAllRequest,
  notificationDeleteRequest,
  notificationReadAllRequest,
  notificationReadRequest,
} from "../services/notification";
import { useNotificationStore } from "../store/useNotificationStore";

export const checkNotification = (id: number) => {
  notificationReadRequest(id).catch(() => {
    toast.error("Error al leer la notificación");
  });
};

export const checkNotificationAll = () => {
  const { checkNotificationAll } = useNotificationStore();
  notificationReadAllRequest().catch(() => {
    toast.error("Error al leer las notificaciones");
  });
  checkNotificationAll();
};

export const deleteNotification = (id: number) => {
  const { deleteNotification } = useNotificationStore();
  notificationDeleteRequest(id).catch(() => {
    toast.error("Error al eliminar la notificación");
  });
  deleteNotification(id);
};

export const deleteNotificationAll = () => {
  const { deleteNotificationAll } = useNotificationStore();
  notificationDeleteAllRequest().catch(() => {
    toast.error("Error al eliminar las notificaciones");
  });
  deleteNotificationAll();
};
