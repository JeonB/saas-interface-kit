import { render, screen } from "@testing-library/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";

describe("Breadcrumb", () => {
  it("renders nav with aria-label", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Settings</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("renders items as list items", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Projects</BreadcrumbItem>
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
