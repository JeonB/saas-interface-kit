import { getNotificationsData, isCategory, isSeverity } from "../../../lib/notifications-mock";
import type { NotificationCategory, NotificationSeverity } from "../../../lib/notifications.types";
import { NotificationsList } from "./notifications-list";

type NotificationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseString(raw: string | string[] | undefined): string | undefined {
  if (typeof raw !== "string") {
    return undefined;
  }
  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function parseUnread(raw: string | undefined): boolean {
  return raw === "1" || raw === "true";
}

export default async function NotificationsPage({ searchParams }: NotificationsPageProps) {
  const params = await searchParams;
  const categoryRaw = parseString(params.category);
  const severityRaw = parseString(params.severity);
  const category: NotificationCategory | undefined =
    categoryRaw && isCategory(categoryRaw) ? categoryRaw : undefined;
  const severity: NotificationSeverity | undefined =
    severityRaw && isSeverity(severityRaw) ? severityRaw : undefined;
  const unreadOnly = parseUnread(parseString(params.unread));
  const items = await getNotificationsData({ category, severity });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">알림</h1>
      <p className="mt-2 text-sm text-neutral-400">
        실행·통합·청구 등 주요 이벤트를 한곳에서 확인합니다. 읽음 상태는 이 브라우저에만 저장됩니다.
      </p>
      <div className="mt-8">
        <NotificationsList items={items} query={{ category, severity, unreadOnly }} />
      </div>
    </div>
  );
}
