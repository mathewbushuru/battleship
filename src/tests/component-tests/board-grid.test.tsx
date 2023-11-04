import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import BoardGrid from "@/components/board-grid";

describe("<BoardGrid />", () => {
  afterEach(cleanup);

  it("renders BoardGrid component without crashing", () => {
    const result = render(
      <BoardGrid />,
    );
    expect(result.getByRole('BoardGrid')).toBeInTheDocument();
  });
});
