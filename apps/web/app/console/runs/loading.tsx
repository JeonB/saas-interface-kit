import { Skeleton } from "@repo/ui/skeleton";

export default function RunsLoading() {
  return (
    <div className="ui:mx-auto ui:max-w-6xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <Skeleton className="ui:h-8 ui:w-36" />
      <Skeleton className="ui:mt-3 ui:h-5 ui:w-3/4" />
      <Skeleton className="ui:mt-8 ui:h-10 ui:w-full ui:max-w-xl" />
      <Skeleton className="ui:mt-6 ui:h-64 ui:w-full" />
    </div>
  );
}
