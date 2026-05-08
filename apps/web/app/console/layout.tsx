import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
} from "@repo/ui/app-shell";
import { ToastProvider } from "@repo/ui/toast";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { AppProductHeader } from "../../components/app-product-header";
import { AppSidebar } from "../../components/app-sidebar";
import { ConsoleCommandPalette } from "../../components/console-command-palette";
import { ShortcutsHelpDialog } from "../../components/shortcuts-help-dialog";

export const metadata: Metadata = {
  title: "콘솔",
};

export default async function AppGroupLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/login?from=/console");
  }

  return (
    <AppShell className="ui:min-h-screen ui:bg-surface-canvas">
      <AppShellSidebar className="ui:border-border-subtle ui:bg-surface-canvas lg:ui:border-border-subtle">
        <AppSidebar />
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader className="ui:border-border-subtle ui:bg-surface-canvas">
          <AppProductHeader />
        </AppShellHeader>
        <AppShellContent className="ui:bg-surface-canvas ui:p-0" id="main-content">
          <ToastProvider>
            <ConsoleCommandPalette />
            <ShortcutsHelpDialog />
            {children}
          </ToastProvider>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  );
}
