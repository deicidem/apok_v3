export interface Notification {
  id: string;
  name: string;
  message: string;
  read: boolean;
  date: Date;
  updateUnread: boolean;
}

export interface NotificationMap {
  [key: string]: { data: Notification; index: number };
}
