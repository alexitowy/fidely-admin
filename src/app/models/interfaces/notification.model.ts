export interface Notification {
  id: string;
  shopId?: string;
  icon: string;
  shopName?: string;
  title: string;
  desc: string;
  date: string;
  isNew: boolean;
  isRead: boolean;
  extraData?: Record<string, string>;
}
