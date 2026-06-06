import type {
  NotificationCategory,
  NotificationDto,
  NotificationSeverity,
} from "@repo/api-client";

// DTO contract lives in @repo/api-client; re-exported here so console code keeps one import path.
export type { NotificationCategory, NotificationSeverity };

export type Notification = NotificationDto;

export type NotificationFilter = {
  category?: NotificationCategory;
  severity?: NotificationSeverity;
  unreadOnly?: boolean;
};
