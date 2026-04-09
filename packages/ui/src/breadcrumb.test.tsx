import { render, screen } from "@testing-library/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";

describe("Breadcrumb", () => {
  it("renders nav with aria-label", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>홈</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>설정</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "경로" })).toBeInTheDocument();
  });

  it("renders items as list items", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>홈</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>프로젝트</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("hides separator from assistive tech", () => {
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
