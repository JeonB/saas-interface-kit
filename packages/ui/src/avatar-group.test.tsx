import { render, screen } from "@testing-library/react";
import { AvatarGroup } from "./avatar-group";
import { Avatar } from "./avatar";

describe("아바타 그룹", () => {
  it("최대 개수까지 아바타 렌더", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" size="md" />
        <Avatar fallback="B" size="md" />
        <Avatar fallback="C" size="md" />
      </AvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
  });

  it("aria-label로 초과 개수 표시", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar fallback="A" size="md" />
        <Avatar fallback="B" size="md" />
        <Avatar fallback="C" size="md" />
        <Avatar fallback="D" size="md" />
      </AvatarGroup>,
    );
    const overflow = screen.getByRole("img", { name: "2명 더 있음" });
    expect(overflow).toHaveTextContent("+2");
  });

  it("max 미만이면 모두 렌더", () => {
    render(
      <AvatarGroup max={5}>
        <Avatar fallback="X" size="md" />
      </AvatarGroup>,
    );
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /더 있음/ })).not.toBeInTheDocument();
  });
});
