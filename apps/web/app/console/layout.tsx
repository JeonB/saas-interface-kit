import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
} from "@repo/ui/app-shell";
import { ToastProvider } from "@repo/ui/toast";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { buildConsoleLoginRedirectFromHeaders } from "../../lib/redirect-path";
import { AppProductHeader } from "../../components/app-product-header";
import { AppSidebar } from "../../components/app-sidebar";
import { ApiDevSimulationPanelData } from "../../components/api-dev-simulation-panel-data";
import { ConsoleCommandPalette } from "../../components/console-command-palette";
import { ShortcutsHelpDialog } from "../../components/shortcuts-help-dialog";

export const metadata: Metadata = {
  title: "콘솔",
};

export default async function AppGroupLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect(buildConsoleLoginRedirectFromHeaders(await headers()));
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
            <ApiDevSimulationPanelData />
            <ConsoleCommandPalette />
            <ShortcutsHelpDialog />
            {children}
          </ToastProvider>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  );
}
