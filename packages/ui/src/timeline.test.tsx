import { render, screen } from "@testing-library/react";
import { Timeline, TimelineItem } from "./timeline";

describe("Timeline", () => {
  it("renders items as list", () => {
    render(
      <Timeline>
        <TimelineItem time="2 min ago">Deploy completed.</TimelineItem>
        <TimelineItem>Build started.</TimelineItem>
      </Timeline>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Deploy completed.")).toBeInTheDocument();
    expect(screen.getByText("2 min ago")).toBeInTheDocument();
  });
});
