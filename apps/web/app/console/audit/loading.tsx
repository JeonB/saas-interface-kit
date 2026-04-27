import { Skeleton } from "@repo/ui/skeleton";

export default function AuditLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="mt-3 h-5 w-2/3" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-8 w-40" />
      </div>
    </div>
  );
}
