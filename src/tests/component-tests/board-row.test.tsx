import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import BoardRow from "@/components/board-row";

describe("<BoardRow />", () => {
  afterEach(cleanup);

  it("renders BoardRow component without crashing", () => {
    const result = render(
      <BoardRow
        row={0}
      />,
    );
    expect(result.getByTestId("BoardRowComponent")).toBeInTheDocument();
  });
});
