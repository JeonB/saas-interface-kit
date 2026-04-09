import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import Link from "next/link";

const PRINCIPLES = [
  "모든 컴포넌트는 className을 추가 확장 용도로만 사용한다.",
  "variant는 의미(역할), size는 밀도(시각적 계층)를 표현한다.",
  "기본 상태(disabled, role, aria)는 컴포넌트 내부에서 보장한다.",
  "새 컴포넌트는 구현과 동시에 Storybook 문서와 Docs 가이드를 같이 업데이트한다.",
];

export default function DesignSystemPage() {
  return (
    <>
      <Badge className="mb-4" variant="success">
        디자인 시스템
      </Badge>
      <h1 className="text-3xl font-bold text-white">디자인 시스템 원칙</h1>
      <p className="mt-2 text-neutral-400">
        `@repo/ui`는 화면 구현 도구가 아니라, 팀이 반복적으로 같은 품질을
        내도록 돕는 운영 계약입니다.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">여기서 시작(약 20분)</h2>
        <ol className="list-decimal space-y-2 pl-6 text-sm text-neutral-300">
          <li>
            <Link href="/docs" className="text-blue-300 underline-offset-2 hover:underline">
              문서 소개
            </Link>
            에서 문제-해결-효과 전체 흐름을 먼저 확인합니다.
          </li>
          <li>
            <Link
              href="/docs/quality-gates"
              className="text-blue-300 underline-offset-2 hover:underline"
            >
              품질 게이트
            </Link>
            로 이동해 왜 타입/린트/테스트를 한 경로로 묶었는지 파악합니다.
          </li>
          <li>
            <Link
              href="/docs/foundations"
              className="text-blue-300 underline-offset-2 hover:underline"
            >
              파운데이션
            </Link>
            에서 토큰과 시맨틱 컬러 역할을 확인합니다.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">API 계약</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
          {PRINCIPLES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">근거 체크리스트</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
          <li>Button 컴포넌트에서 variant/size/disabled가 타입으로 강제되는지 확인</li>
          <li>Storybook에서 Button, Field, Input 등 핵심 스토리의 Do/Don&apos;t가 API 계약과 일치하는지 확인</li>
          <li>새 폼 컴포넌트에 <code className="rounded bg-neutral-800 px-1">name</code>과 접근 가능한 이름이 있는지 확인</li>
          <li>품질 게이트 페이지 체크리스트가 실제 실행 명령과 맞는지 확인</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">권장과 비권장</h2>
        <Alert title="권장" variant="success">
          페이지별 스타일 편차를 줄이기 위해 variant와 size를 우선 사용하세요.
        </Alert>
        <Alert title="비권장" variant="warning">
          컴포넌트마다 임의의 className으로 디자인 토큰을 재정의하지 마세요.
        </Alert>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">빠른 예시</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="default">
            보조
          </Button>
          <Button size="md" variant="primary">
            주요
          </Button>
          <Button size="lg" variant="danger">
            삭제
          </Button>
        </div>
      </section>
    </>
  );
}
