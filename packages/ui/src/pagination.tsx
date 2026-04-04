import { Button } from "./button";
import { cn } from "./cn";

export type PaginationProps = {
  className?: string;
  onPageChange: (page: number) => void;
  page: number;
  pageCount: number;
};

export function Pagination({ className, onPageChange, page, pageCount }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn("ui:flex ui:items-center ui:gap-3", className)}>
      <Button
        disabled={page <= 1}
        name="paginationPrev"
        onClick={() => {
          onPageChange(page - 1);
        }}
        type="button"
        variant="default"
      >
        Previous
      </Button>
      <span className="ui:text-sm ui:text-text-secondary">
        Page {page} of {pageCount}
      </span>
      <Button
        disabled={page >= pageCount}
        name="paginationNext"
        onClick={() => {
          onPageChange(page + 1);
        }}
        type="button"
        variant="default"
      >
        Next
      </Button>
    </nav>
  );
}
