"use client";

import { Field } from "@repo/ui/field";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { Input } from "@repo/ui/input";
import { useEffect, useState } from "react";
import { setOrDelete } from "../../../lib/search-params";
import { useUrlSearchNavigate } from "../../../lib/use-url-search-navigate";

export type IntegrationFilterStatus = "all" | "connected" | "error" | "disconnected";

type IntegrationsFiltersProps = {
  query: string;
  status: IntegrationFilterStatus;
};

export function IntegrationsFilters({ query, status }: IntegrationsFiltersProps) {
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

  const chips: Array<{ label: string; value: IntegrationFilterStatus }> = [
    { label: "전체", value: "all" },
    { label: "연결됨", value: "connected" },
    { label: "오류", value: "error" },
    { label: "미연결", value: "disconnected" },
  ];

  return (
    <div className="space-y-3" aria-busy={isPending}>
      <Field id="integration-search" label="통합 검색">
        <Input
          name="integrationSearch"
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="통합 이름 또는 벤더 검색"
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
