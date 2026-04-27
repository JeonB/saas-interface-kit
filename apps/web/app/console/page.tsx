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

export default function AppHomePage() {
  return (
    <>
      <Suspense fallback={<ApiStatusFallback />}>
        <ApiStatusBanner />
      </Suspense>
      <DashboardOverview />
    </>
  );
}
