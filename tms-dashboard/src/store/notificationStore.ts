import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationState {
  shownNotifications: Set<string>;
  addShownNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      shownNotifications: new Set(),
      addShownNotification: (id) =>
        set((state) => ({
          shownNotifications: new Set(state.shownNotifications).add(id),
        })),
    }),
    {
      name: 'notification-storage',
      // Custom storage serialization to handle Set objects which are not supported by default
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              shownNotifications: new Set(state.shownNotifications),
            },
          };
        },
        setItem: (name, newValue) => {
          const str = JSON.stringify({
            state: {
              ...newValue.state,
              shownNotifications: Array.from(newValue.state.shownNotifications),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
