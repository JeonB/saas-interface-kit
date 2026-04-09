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
    <nav aria-label="페이지 탐색" className={cn("ui:flex ui:items-center ui:gap-3", className)}>
      <Button
        disabled={page <= 1}
        name="paginationPrev"
        onClick={() => {
          onPageChange(page - 1);
        }}
        type="button"
        variant="default"
      >
        이전
      </Button>
      <span className="ui:text-sm ui:text-text-secondary">
        {page} / {pageCount} 페이지
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
        다음
      </Button>
    </nav>
  );
}
