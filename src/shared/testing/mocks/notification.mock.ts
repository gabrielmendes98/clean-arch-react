import { NotificationService } from 'shared/application/notification.port';

export const notificationServiceMock: NotificationService = {
  notify: jest.fn(),
};
