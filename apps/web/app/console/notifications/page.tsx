import { getNotificationsData, isCategory, isSeverity } from "../../../lib/notifications-mock";
import type { NotificationCategory, NotificationSeverity } from "../../../lib/notifications.types";
import { parseBooleanFlag, parseString } from "../../../lib/search-params";
import { NotificationsList } from "./notifications-list";

type NotificationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NotificationsPage({ searchParams }: NotificationsPageProps) {
  const params = await searchParams;
  const categoryRaw = parseString(params.category);
  const severityRaw = parseString(params.severity);
  const category: NotificationCategory | undefined =
    categoryRaw && isCategory(categoryRaw) ? categoryRaw : undefined;
  const severity: NotificationSeverity | undefined =
    severityRaw && isSeverity(severityRaw) ? severityRaw : undefined;
  const unreadOnly = parseBooleanFlag(params.unread);
  const items = await getNotificationsData({ category, severity });

  return (
    <div className="ui:mx-auto ui:max-w-5xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">알림</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">
        실행·통합·청구 등 주요 이벤트를 한곳에서 확인합니다. 읽음 상태는 이 브라우저에만 저장됩니다.
      </p>
      <div className="ui:mt-8">
        <NotificationsList items={items} query={{ category, severity, unreadOnly }} />
      </div>
    </div>
  );
}
