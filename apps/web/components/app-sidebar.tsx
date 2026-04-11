"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/cn";
import { Sidebar, SidebarGroup, SidebarItem } from "@repo/ui/sidebar";

const linkClass = (active: boolean) =>
  cn(
    "ui:block ui:rounded-ui-md ui:px-2 ui:py-2 ui:text-sm ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
    active
      ? "ui:bg-surface-muted ui:font-medium ui:text-text-primary"
      : "ui:text-text-secondary hover:ui:bg-surface-muted/60 hover:ui:text-text-primary",
  );

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="ui:lg:min-h-screen">
      <SidebarGroup label="제품">
        <Link className={linkClass(pathname === "/app")} href="/app">
          개요
        </Link>
        <Link className={linkClass(pathname === "/app/members")} href="/app/members">
          멤버
        </Link>
      </SidebarGroup>
      <SidebarGroup label="설정">
        <Link className={linkClass(pathname === "/app/settings")} href="/app/settings">
          조직
        </Link>
        <Link
          className={linkClass(pathname === "/app/settings/billing")}
          href="/app/settings/billing"
        >
          청구
        </Link>
      </SidebarGroup>
      <div className="ui:mt-4 ui:border-t ui:border-border-subtle ui:pt-3">
        <SidebarItem href="/">마케팅 홈</SidebarItem>
      </div>
    </Sidebar>
  );
}
