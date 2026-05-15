"use client";

import { useCallback, useState, useTransition } from "react";
import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import { setApiDevSimulationAction } from "../app/actions/api-dev-simulation";
import {
  API_DEV_DELAY_OPTIONS,
  type ApiDevFault,
  type ApiDevSimulation,
  isApiDevSimulationActive,
} from "../lib/api-dev-simulation";

type ApiDevSimulationPanelProps = {
  initial: ApiDevSimulation;
};

const FAULT_OPTIONS: { value: ApiDevFault; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "503", label: "503 서비스 불가" },
  { value: "timeout", label: "타임아웃" },
  { value: "network", label: "네트워크 오류" },
];

export function ApiDevSimulationPanel({ initial }: ApiDevSimulationPanelProps) {
  const [simulation, setSimulation] = useState<ApiDevSimulation>(initial);
  const [pending, startTransition] = useTransition();

  const apply = useCallback((next: ApiDevSimulation) => {
    setSimulation(next);
    startTransition(async () => {
      await setApiDevSimulationAction(next);
    });
  }, []);

  const reset = useCallback(() => {
    apply({ delayMs: 0, fault: "none" });
  }, [apply]);

  return (
    <div className="border-b border-border-subtle bg-surface-raised px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">API 시뮬레이션</p>
          <p className="mt-1 text-sm text-text-secondary">
            통합·실행 기록 데이터 로드에 지연 또는 오류를 주입합니다. 저장 후 해당 페이지를 새로고침하세요.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-xs text-text-muted">
            지연 (ms)
            <select
              className="rounded-ui-sm border border-border-subtle bg-surface-canvas px-2 py-1.5 text-sm text-text-primary"
              disabled={pending}
              name="apiDevDelayMs"
              onChange={(e) => {
                const delayMs = Number(e.target.value);
                apply({ ...simulation, delayMs });
              }}
              value={String(simulation.delayMs)}
            >
              {API_DEV_DELAY_OPTIONS.map((ms) => (
                <option key={ms} value={ms}>
                  {ms === 0 ? "없음" : `${ms}ms`}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-text-muted">
            오류
            <select
              className="rounded-ui-sm border border-border-subtle bg-surface-canvas px-2 py-1.5 text-sm text-text-primary"
              disabled={pending}
              name="apiDevFault"
              onChange={(e) => {
                const fault = e.target.value as ApiDevFault;
                apply({ ...simulation, fault });
              }}
              value={simulation.fault}
            >
              {FAULT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <Button disabled={pending} name="apiDevReset" onClick={reset} type="button" variant="default">
            초기화
          </Button>
        </div>
      </div>
      {isApiDevSimulationActive(simulation) ? (
        <Alert className="mx-auto mt-3 max-w-6xl" title="시뮬레이션 활성" variant="warning">
          지연 {simulation.delayMs}ms
          {simulation.fault !== "none" ? ` · 오류: ${simulation.fault}` : ""}. 로딩·에러 UI 확인 후 초기화하세요.
        </Alert>
      ) : null}
    </div>
  );
}
