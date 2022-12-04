import { toast } from 'react-toastify';
import {
  NotificationService,
  NotificationType,
} from 'employee/application/ports/notification';

export const useNotification = (): NotificationService => {
  const notify = (message: string, type: NotificationType) =>
    toast(message, {
      type,
    });

  return {
    notify,
  };
};
