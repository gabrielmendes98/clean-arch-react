import { NotificationService } from 'shared/domain/interfaces/notification.interface';

export const notificationServiceMock: NotificationService = {
  notify: jest.fn(),
};
