import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { fetchAwbs } from '@/api';
import type { AWB } from '@/types';

export const useNotificationPoller = () => {
  const { user } = useUserStore();
  const { shownNotifications, addShownNotification } = useNotificationStore();
  const queryClient = useQueryClient();
  const previousData = useRef<AWB[]>([]);

  useEffect(() => {
    if (!user) return;

    // Initialize previousData on first run
    const initializeData = async () => {
      const initialData = await fetchAwbs(user);
      previousData.current = initialData;
      queryClient.setQueryData(['awbs', user.id], initialData);
    };
    initializeData();

    const interval = setInterval(async () => {
      const newData = await fetchAwbs(user);

      // Compare newData with previousData to find status changes
      newData.forEach(newAwb => {
        const oldAwb = previousData.current.find(awb => awb.id === newAwb.id);
        if (oldAwb && oldAwb.status !== newAwb.status) {
          const notificationId = `${newAwb.id}-${newAwb.status}`;
          if (!shownNotifications.has(notificationId)) {
            toast.info(`Status of AWB ${newAwb.id} changed to ${newAwb.status}`);
            addShownNotification(notificationId);
          }
        }
      });

      previousData.current = newData;
      // Update the query cache to keep the UI in sync
      queryClient.setQueryData(['awbs', user.id], newData);

    }, 15000); // Poll every 15 seconds

    return () => clearInterval(interval);
  }, [user, shownNotifications, addShownNotification, queryClient]);
};
