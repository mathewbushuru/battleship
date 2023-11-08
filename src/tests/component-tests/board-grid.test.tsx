import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import BoardGrid from "@/components/board-grid";

describe("<BoardGrid />", () => {
  afterEach(cleanup);

  it("renders BoardGrid component without crashing", () => {
    const result = render(
      <BoardGrid />,
    );
    expect(result.getByTestId('BoardGridComponent')).toBeInTheDocument();
  });
});
