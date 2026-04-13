import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DialogContent, DialogTitle } from "./dialog";

describe("다이얼로그 컨텍스트", () => {
  it("Dialog 밖에서 DialogContent 사용 시 오류", () => {
    expect(() =>
      render(
        <DialogContent>
          <DialogTitle>X</DialogTitle>
        </DialogContent>,
      ),
    ).toThrow(/must be used within Dialog/);
  });
});
