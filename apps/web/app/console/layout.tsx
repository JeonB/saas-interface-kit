import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
} from "@repo/ui/app-shell";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { AppProductHeader } from "../../components/app-product-header";
import { AppSidebar } from "../../components/app-sidebar";

export const metadata: Metadata = {
  title: "콘솔",
};

export default async function AppGroupLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/login?from=/console");
  }

  return (
    <AppShell className="min-h-screen bg-neutral-950">
      <AppShellSidebar className="border-neutral-800 bg-neutral-950 lg:border-neutral-800">
        <AppSidebar />
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader className="border-neutral-800 bg-neutral-950">
          <AppProductHeader />
        </AppShellHeader>
        <AppShellContent className="bg-neutral-950 p-0" id="main-content">
          {children}
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  );
}
