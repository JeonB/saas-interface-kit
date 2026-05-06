"use client";

import type { RunStatus } from "@repo/api-client";
import { Field } from "@repo/ui/field";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { Input } from "@repo/ui/input";
import { useEffect, useState } from "react";
import { setOrDelete } from "../../../lib/search-params";
import { useUrlSearchNavigate } from "../../../lib/use-url-search-navigate";

export type RunsFilterStatus = "all" | RunStatus;

type RunsFiltersProps = {
  query: string;
  status: RunsFilterStatus;
};

export function RunsFilters({ query, status }: RunsFiltersProps) {
  const { navigate, isPending } = useUrlSearchNavigate();
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate((params) => {
        setOrDelete(params, "q", searchInput);
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
