import { create } from "zustand";

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

export const useNotificationStore = create<Store>()((set) => ({
  notifications: [],
  setNotifications: (notifications: Notifications[]) => set({ notifications }),
  addNotifications: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),

  checkNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      ),
    })),

  checkNotificationAll: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    })),

  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),

  deleteNotificationAll: () => set({ notifications: [] }),
}));
