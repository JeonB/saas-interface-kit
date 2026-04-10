import { render, screen } from "@testing-library/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";

describe("브레드크럼", () => {
  it("aria-label이 있는 nav로 렌더", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>홈</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>설정</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "경로" })).toBeInTheDocument();
  });

  it("항목을 리스트 아이템으로 렌더", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>홈</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>프로젝트</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("보조 기술에서 구분선 숨김", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>A</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>B</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separator = container.querySelector("[aria-hidden]");
    expect(separator).toHaveTextContent("/");
  });
});
