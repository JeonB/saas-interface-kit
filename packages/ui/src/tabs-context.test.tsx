import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TabsTrigger } from "./tabs";

describe("탭 컨텍스트", () => {
  it("Tabs 밖에서 TabsTrigger 사용 시 오류", () => {
    expect(() => render(<TabsTrigger value="a">A</TabsTrigger>)).toThrow(
      /must be used within Tabs/,
    );
  });
});
