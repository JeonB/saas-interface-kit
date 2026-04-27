"use client";

import type { AuditEventAction } from "@repo/api-client";
import { Button } from "@repo/ui/button";
import { Field } from "@repo/ui/field";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { Input } from "@repo/ui/input";
import { Pagination } from "@repo/ui/pagination";
import { Select } from "@repo/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { type FormEvent } from "react";

type AuditFiltersProps = {
  action?: AuditEventAction;
  actor?: string;
  from?: string;
  page: number;
  pageCount: number;
  size: number;
  to?: string;
};

const ACTION_OPTIONS: AuditEventAction[] = [
  "member.invited",
  "member.removed",
  "role.changed",
  "billing.payment_method_added",
  "api_key.created",
  "api_key.revoked",
];

function updateQuery(params: URLSearchParams, key: string, value: string): void {
  const next = value.trim();
  if (next.length > 0) {
    params.set(key, next);
    return;
  }
  params.delete(key);
}

export function AuditFilters({ actor, action, from, to, page, size, pageCount }: AuditFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(window.location.search);
    mutate(params);
    const query = params.toString();
    router.push(query.length > 0 ? `${pathname}?${query}` : pathname);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const actorInput = String(formData.get("actor") ?? "");
    const actionInput = String(formData.get("action") ?? "");
    const fromInput = String(formData.get("from") ?? "");
    const toInput = String(formData.get("to") ?? "");
    navigate((params) => {
      updateQuery(params, "actor", actorInput);
      updateQuery(params, "action", actionInput);
      updateQuery(params, "from", fromInput);
      updateQuery(params, "to", toInput);
      params.set("page", "1");
      params.set("size", String(size));
    });
  };

  return (
    <div className="space-y-3">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="grid gap-3 md:grid-cols-4">
          <Field id="audit-actor" label="액터">
            <Input defaultValue={actor ?? ""} name="actor" placeholder="email 또는 이름" type="search" />
          </Field>
          <Field id="audit-action" label="이벤트">
            <Select defaultValue={action ?? ""} name="action">
              <option value="">전체</option>
              {ACTION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="audit-from" label="시작일">
            <Input defaultValue={from ?? ""} name="from" type="date" />
          </Field>
          <Field id="audit-to" label="종료일">
            <Input defaultValue={to ?? ""} name="to" type="date" />
          </Field>
        </div>
        <Button name="applyAuditFilters" type="submit" variant="primary">
          필터 적용
        </Button>
      </form>
      <FilterBar>
        <FilterChip
          active={!action}
          onClick={() => {
            navigate((params) => {
              params.delete("action");
              params.set("page", "1");
            });
          }}
        >
          전체
        </FilterChip>
        {ACTION_OPTIONS.map((option) => (
          <FilterChip
            active={action === option}
            key={option}
            onClick={() => {
              navigate((params) => {
                params.set("action", option);
                params.set("page", "1");
              });
            }}
          >
            {option}
          </FilterChip>
        ))}
      </FilterBar>
      <Pagination
        onPageChange={(nextPage) => {
          navigate((params) => {
            params.set("page", String(nextPage));
            params.set("size", String(size));
          });
        }}
        page={page}
        pageCount={pageCount}
      />
    </div>
  );
}
