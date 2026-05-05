import { getNotificationsData } from "../lib/notifications-mock";
import { NotificationsBell } from "./notifications-bell";

export async function NotificationsBellData() {
  const items = await getNotificationsData({});
  return <NotificationsBell items={items} />;
}
