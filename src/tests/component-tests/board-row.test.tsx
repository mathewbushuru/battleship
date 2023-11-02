import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import BoardRow from "@/components/board-row";

describe("<BoardCell />", () => {
  afterEach(cleanup);

  it("renders BoardCell component without crashing", () => {
    const result = render(
      <BoardRow
        row={0}
      />,
    );
    expect(result.getByTestId("BoardRowComponent")).toBeInTheDocument();
  });
});
