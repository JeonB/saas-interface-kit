"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { EmptyState } from "@repo/ui/empty-state";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { Timeline, TimelineItem } from "@repo/ui/timeline";
import { useToast } from "@repo/ui/toast";
import { formatConsoleDateTime } from "../../../lib/datetime";
import type {
  Notification,
  NotificationCategory,
  NotificationSeverity,
} from "../../../lib/notifications.types";
import { useReadStore } from "../../../lib/notifications-read-store";
import { setOrDelete } from "../../../lib/search-params";
import { useUrlSearchNavigate } from "../../../lib/use-url-search-navigate";

export type NotificationsQueryState = {
  category?: NotificationCategory;
  severity?: NotificationSeverity;
  unreadOnly: boolean;
};

type NotificationsListProps = {
  items: Notification[];
  query: NotificationsQueryState;
};

const CATEGORY_OPTIONS: Array<{ label: string; value?: NotificationCategory }> = [
  { label: "전체", value: undefined },
  { label: "실행", value: "run" },
  { label: "통합", value: "integration" },
  { label: "청구", value: "billing" },
  { label: "멤버", value: "member" },
  { label: "시스템", value: "system" },
];

const SEVERITY_OPTIONS: Array<{ label: string; value?: NotificationSeverity }> = [
  { label: "전체", value: undefined },
  { label: "정보", value: "info" },
  { label: "성공", value: "success" },
  { label: "경고", value: "warning" },
  { label: "오류", value: "error" },
];

function severityIcon(severity: NotificationSeverity) {
  switch (severity) {
    case "error":
      return <XCircle aria-hidden className="ui:h-4 ui:w-4 ui:text-semantic-danger" />;
    case "warning":
      return <AlertTriangle aria-hidden className="ui:h-4 ui:w-4 ui:text-semantic-warning" />;
    case "success":
      return <CheckCircle2 aria-hidden className="ui:h-4 ui:w-4 ui:text-semantic-success" />;
    case "info":
    default:
      return <Info aria-hidden className="ui:h-4 ui:w-4 ui:text-semantic-info" />;
  }
}

function severityVariant(severity: NotificationSeverity): "default" | "success" | "warning" | "danger" {
  switch (severity) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "error":
      return "danger";
    case "info":
    default:
      return "default";
  }
}

export function NotificationsList({ items, query }: NotificationsListProps) {
  const { navigate } = useUrlSearchNavigate();
  const { toast } = useToast();
  const { isRead, markRead, markAllRead } = useReadStore();

  const visible = useMemo(() => {
    if (!query.unreadOnly) {
      return items;
    }
    return items.filter((n) => !isRead(n.id));
  }, [items, query.unreadOnly, isRead]);

  const onMarkAllVisibleRead = useCallback(() => {
    const ids = visible.filter((n) => !isRead(n.id)).map((n) => n.id);
    if (ids.length === 0) {
      return;
    }
    markAllRead(ids);
    toast({
      title: "알림",
      message: "표시 중인 알림을 모두 읽음으로 표시했습니다.",
      variant: "success",
    });
  }, [visible, isRead, markAllRead, toast]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-400">
          필터는 URL에 반영됩니다. 읽음 상태는 로컬 저장소에만 기록됩니다.
        </p>
        <Button name="markAllNotificationsRead" onClick={onMarkAllVisibleRead} type="button" variant="primary">
          모두 읽음
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500">범주</p>
        <FilterBar>
          {CATEGORY_OPTIONS.map((opt) => (
            <FilterChip
              active={query.category === opt.value}
              key={opt.label}
              onClick={() => {
                navigate((params) => {
                  setOrDelete(params, "category", opt.value);
                });
              }}
            >
              {opt.label}
            </FilterChip>
          ))}
        </FilterBar>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500">심각도</p>
        <FilterBar>
          {SEVERITY_OPTIONS.map((opt) => (
            <FilterChip
              active={query.severity === opt.value}
              key={opt.label}
              onClick={() => {
                navigate((params) => {
                  setOrDelete(params, "severity", opt.value);
                });
              }}
            >
              {opt.label}
            </FilterChip>
          ))}
        </FilterBar>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500">읽음 상태</p>
        <FilterBar>
          <FilterChip
            active={!query.unreadOnly}
            onClick={() => {
              navigate((params) => {
                params.delete("unread");
              });
            }}
          >
            전체
          </FilterChip>
          <FilterChip
            active={query.unreadOnly}
            onClick={() => {
              navigate((params) => {
                params.set("unread", "1");
              });
            }}
          >
            미열람만
          </FilterChip>
        </FilterBar>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          description="필터를 바꾸거나 미열람만 보기를 해제해 보세요."
          title="표시할 알림이 없습니다"
        />
      ) : (
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <Timeline>
            {visible.map((n) => (
              <TimelineItem key={n.id} icon={severityIcon(n.severity)} time={formatConsoleDateTime(n.createdAt)}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {n.href ? (
                        <Link
                          className="font-semibold text-white underline-offset-2 hover:underline"
                          href={n.href}
                        >
                          {n.title}
                        </Link>
                      ) : (
                        <span className="font-semibold text-white">{n.title}</span>
                      )}
                      {!isRead(n.id) ? (
                        <span className="text-xs font-medium text-blue-400" role="status">
                          새 알림
                        </span>
                      ) : null}
                      <Badge variant={severityVariant(n.severity)}>{n.severity}</Badge>
                      <Badge variant="default">{n.category}</Badge>
                    </div>
                    <p className="text-sm text-neutral-400">{n.description}</p>
                  </div>
                  {!isRead(n.id) ? (
                    <Button
                      name={`markNotificationRead-${n.id}`}
                      onClick={() => {
                        markRead(n.id);
                      }}
                      size="sm"
                      type="button"
                      variant="default"
                    >
                      읽음 처리
                    </Button>
                  ) : null}
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      )}
    </div>
  );
}
