import { Skeleton } from "@repo/ui/skeleton";

export default function IntegrationsLoading() {
  return (
    <div className="ui:mx-auto ui:max-w-5xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <Skeleton className="ui:h-8 ui:w-32" />
      <Skeleton className="ui:mt-3 ui:h-5 ui:w-2/3" />
      <Skeleton className="ui:mt-6 ui:h-10 ui:w-full ui:max-w-xl" />
      <div className="ui:mt-8 ui:grid ui:gap-4 md:ui:grid-cols-2 lg:ui:grid-cols-3">
        <Skeleton className="ui:h-40 ui:w-full" />
        <Skeleton className="ui:h-40 ui:w-full" />
        <Skeleton className="ui:h-40 ui:w-full" />
        <Skeleton className="ui:h-40 ui:w-full" />
        <Skeleton className="ui:h-40 ui:w-full" />
        <Skeleton className="ui:h-40 ui:w-full" />
      </div>
    </div>
  );
}
