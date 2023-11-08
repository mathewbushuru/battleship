import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import BoardCell from "@/components/board-cell";

describe("<BoardCell />", () => {
  afterEach(cleanup);

  it("renders BoardCell component without crashing", () => {
    const result = render(
      <BoardCell
        row={0}
        col={0}
        isMouseOver={false}
        isValidPlacement={false}
      />,
    );
    expect(result.getByTestId("Row0Col0Cell")).toBeInTheDocument();
  });
});
