# Changesets

이 프로젝트는 [Changesets](https://github.com/changesets/changesets)를 사용해 패키지 버전과 변경 이력을 관리합니다.

## 사용법

### 1. 변경사항 기록

PR을 올리기 전에 changeset을 생성합니다:

```bash
pnpm changeset
```

대화형 프롬프트가 나타나면:

1. **변경된 패키지 선택** — 보통 `@repo/ui`
2. **변경 유형 선택** — `patch`(버그 수정), `minor`(새 기능), `major`(breaking change)
3. **변경 설명 작성** — 무엇을 왜 변경했는지 한 줄로 기술

`.changeset/` 디렉토리에 마크다운 파일이 생성됩니다.

### 2. 버전 업데이트

관리자가 릴리스할 때:

```bash
pnpm version-packages
```

이 명령은 changeset 파일들을 소비하고 `CHANGELOG.md`와 `package.json` 버전을 업데이트합니다.

### 3. CI 검증

PR에 `@repo/ui` 관련 코드 변경이 있지만 changeset이 없으면 CI에서 경고합니다.
이는 변경 이력 누락을 방지합니다.

## 버전 규칙

| 유형 | 언제 사용 | 예시 |
|------|-----------|------|
| `patch` | 버그 수정, 스타일 미세 조정 | `0.1.0` → `0.1.1` |
| `minor` | 새 컴포넌트, 새 prop, 새 토큰 | `0.1.0` → `0.2.0` |
| `major` | Breaking: prop 이름 변경, 삭제, 동작 변경 | `0.1.0` → `1.0.0` |
