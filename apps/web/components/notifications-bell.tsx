"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import type { Notification } from "../lib/notifications.types";
import { useReadStore } from "../lib/notifications-read-store";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type NotificationsBellProps = {
  items: Notification[];
};

export function NotificationsBell({ items }: NotificationsBellProps) {
  const router = useRouter();
  const { unreadCount, isRead, markRead } = useReadStore();
  const sorted = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const preview = sorted.slice(0, 5);
  const allIds = sorted.map((n) => n.id);
  const unread = unreadCount(allIds);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          aria-label={unread > 0 ? `알림 ${unread}건 읽지 않음` : "알림"}
          className="ui:relative"
          name="notificationsBell"
          type="button"
          variant="default"
        >
          <Bell aria-hidden className="ui:h-4 ui:w-4" />
          {unread > 0 ? (
            <Badge
              className="ui:absolute ui:-right-1 ui:-top-1 ui:min-w-[1.25rem] ui:justify-center ui:px-1"
              size="sm"
              variant="danger"
            >
              {unread > 99 ? "99+" : String(unread)}
            </Badge>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ui:left-auto ui:right-0 ui:min-w-[min(100vw-2rem,320px)] ui:p-0">
        <div className="ui:border-b ui:border-border-subtle ui:px-3 ui:py-2 ui:text-xs ui:font-semibold ui:text-text-primary">
          알림
        </div>
        {preview.length === 0 ? (
          <div className="ui:px-3 ui:py-4 ui:text-sm ui:text-text-muted">알림이 없습니다.</div>
        ) : (
          preview.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className="ui:flex ui:flex-col ui:items-start ui:gap-0.5 ui:py-2"
              onClick={() => {
                markRead(n.id);
                if (n.href) {
                  router.push(n.href);
                }
              }}
            >
              <span className="ui:flex ui:w-full ui:items-center ui:justify-between ui:gap-2">
                <span className="ui:truncate ui:font-medium ui:text-text-primary">{n.title}</span>
                {!isRead(n.id) ? (
                  <span aria-hidden className="ui:h-2 ui:w-2 ui:shrink-0 ui:rounded-full ui:bg-semantic-brand" />
                ) : null}
              </span>
              <span className="ui:text-xs ui:text-text-muted">{formatTime(n.createdAt)}</span>
            </DropdownMenuItem>
          ))
        )}
        <div className="ui:border-t ui:border-border-subtle ui:p-1">
          <DropdownMenuItem
            onClick={() => {
              router.push("/console/notifications");
            }}
          >
            모두 보기
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
