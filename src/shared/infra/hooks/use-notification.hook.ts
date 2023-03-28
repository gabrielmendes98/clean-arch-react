import { toast } from 'react-toastify';
import {
  NotificationService,
  NotificationType,
} from 'shared/domain/interfaces/notification.interface';

export const useNotification = (): NotificationService => {
  const notify = (message: string, type: NotificationType) =>
    toast(message, {
      type,
    });

  return {
    notify,
  };
};
