import { toast } from 'react-toastify';
import {
  NotificationService,
  NotificationType,
} from 'shared/application/notification.port';

export const useNotification = (): NotificationService => {
  const notify = (message: string, type: NotificationType) =>
    toast(message, {
      type,
    });

  return {
    notify,
  };
};
