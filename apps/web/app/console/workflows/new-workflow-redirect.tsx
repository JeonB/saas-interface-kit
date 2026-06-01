"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createWorkflow, ensureWorkflowSeeds } from "../../../lib/workflow";

export function NewWorkflowRedirect() {
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    ensureWorkflowSeeds();
    const { id } = createWorkflow("새 워크플로");
    router.replace(`/console/workflows/${id}`);
  }, [router]);

  return <p className="ui:text-sm ui:text-text-secondary">새 워크플로를 준비하는 중…</p>;
}
