export type NotificationCategory = "run" | "integration" | "billing" | "member" | "system";

export type NotificationSeverity = "info" | "success" | "warning" | "error";

export type Notification = {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  severity: NotificationSeverity;
  createdAt: string;
  href?: string;
};

export type NotificationFilter = {
  category?: NotificationCategory;
  severity?: NotificationSeverity;
  unreadOnly?: boolean;
};
