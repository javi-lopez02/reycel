import { create } from "zustand";
import {
  notificationDeleteRequest,
  notificationReadRequest,
} from "../services/notification";
import { toast } from "sonner";

interface Notifications {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

type Store = {
  notifications: Array<Notifications>;
  setNotifications: (notifications: Notifications[]) => void;
  addNotifications: (notification: Notifications) => void;
  checkNotification: (id: number) => void;
  checkNotificationAll: () => void;
  deleteNotification: (id: number) => void;
  deleteNotificationAll: () => void;
};

export const useNotificationStore = create<Store>()((set, get) => ({
  notifications: [],
  setNotifications: (notifications: Notifications[]) => set({ notifications }),
  addNotifications: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),

  checkNotification: (id) => {
    const { notifications } = get();

    const newNotifications = structuredClone(notifications);

    const notificationsIndex = notifications.findIndex(
      (notification) => notification.id === id
    );

    const notificationsRead = notifications[notificationsIndex];

    newNotifications[notificationsIndex] = {
      ...notificationsRead,
      isRead: true,
    };

    notificationReadRequest(id)
      .then(() => {
        set({ notifications: newNotifications });
      })
      .catch((error) => {
        toast.error("Error al leer la notificación");
        console.log(error);
        set({ notifications });
      });
  },

  checkNotificationAll: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    })),

  deleteNotification: (id) => {
    const { notifications } = get();

    const newNotifications = structuredClone(notifications);

    const notificationsDelete = newNotifications.filter((notification) => {
      return notification.id !== id;
    });

    notificationDeleteRequest(id)
      .then(() => {
        set({ notifications: notificationsDelete });
      })
      .catch((error) => {
        toast.error("Error al leer la notificación");
        console.log(error);
        set({ notifications });
      });
  },

  deleteNotificationAll: () => set({ notifications: [] }),
}));
