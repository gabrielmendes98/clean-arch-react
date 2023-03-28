export type NotificationType = 'success' | 'warning' | 'error';

export interface NotificationService {
  notify(message: string, type: NotificationType): void;
}
