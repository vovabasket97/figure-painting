import { NotificationProps } from '@mantine/notifications';

interface INotification {
  id: string;
  message: string;
}

type TNotificationReturn = NotificationProps & { id: string };

export const notificationConfig = {
  pending: ({ id, message }: INotification): TNotificationReturn => ({
    id: id,
    message: message,
    withCloseButton: false,
    title: 'Loading',
    loading: true
  }),

  error: ({ id, message }: INotification): TNotificationReturn => ({
    id: id,
    color: 'red',
    title: 'Error',
    message: message,
    autoClose: 2000
  }),

  success: ({ id, message }: INotification): TNotificationReturn => ({
    id: id,
    color: 'green',
    title: 'Success',
    message: message,
    autoClose: 2000
  })
};
