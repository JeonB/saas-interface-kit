import { ApiStatusBanner } from "../../components/api-status-banner";
import { DashboardOverview } from "../../components/dashboard-overview";
import { Skeleton } from "@repo/ui/skeleton";
import { Suspense } from "react";

function ApiStatusFallback() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

function DashboardFallback() {
  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-16 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function AppHomePage() {
  return (
    <>
      <Suspense fallback={<ApiStatusFallback />}>
        <ApiStatusBanner />
      </Suspense>
      {/* Session/cookie-dependent data stays inside Suspense so the static shell streams first (PPR-ready). */}
      <Suspense fallback={<DashboardFallback />}>
        <DashboardOverview />
      </Suspense>
    </>
  );
}
