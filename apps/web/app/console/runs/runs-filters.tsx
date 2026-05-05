"use client";

import type { RunStatus } from "@repo/api-client";
import { Field } from "@repo/ui/field";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { Input } from "@repo/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export type RunsFilterStatus = "all" | RunStatus;

type RunsFiltersProps = {
  query: string;
  status: RunsFilterStatus;
};

function updateQuery(params: URLSearchParams, key: string, value: string): void {
  const next = value.trim();
  if (next.length > 0) {
    params.set(key, next);
    return;
  }
  params.delete(key);
}

export function RunsFilters({ query, status }: RunsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(query);

  const navigate = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(window.location.search);
      mutate(params);
      const nextQuery = params.toString();
      startTransition(() => {
        router.replace(nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname);
      });
    },
    [pathname, router],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate((params) => {
        updateQuery(params, "q", searchInput);
        params.set("status", status);
      });
    }, 200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [navigate, searchInput, status]);

  const chips: Array<{ label: string; value: RunsFilterStatus }> = [
    { label: "전체", value: "all" },
    { label: "대기", value: "queued" },
    { label: "실행 중", value: "running" },
    { label: "성공", value: "succeeded" },
    { label: "실패", value: "failed" },
    { label: "취소", value: "cancelled" },
  ];

  return (
    <div aria-busy={isPending} className="space-y-3">
      <Field id="runs-search" label="검색">
        <Input
          name="runsQuery"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          placeholder="run ID 또는 workflow ID"
          type="search"
          value={searchInput}
        />
      </Field>
      <FilterBar>
        {chips.map((chip) => (
          <FilterChip
            active={status === chip.value}
            key={chip.value}
            onClick={() => {
              navigate((params) => {
                params.set("status", chip.value);
              });
            }}
          >
            {chip.label}
          </FilterChip>
        ))}
      </FilterBar>
    </div>
  );
}
