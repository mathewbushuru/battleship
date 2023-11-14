import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import BoardGrid from "@/components/board-grid";

vi.mock("react-router-dom", async (importOrig) => {
  const actualModule: any = await importOrig();
  return {
    ...actualModule,
    useLocation: vi.fn().mockReturnValue({ pathname: "/placement" }),
  };
});

describe("<BoardGrid />", () => {
  afterEach(cleanup);

  it("renders BoardGrid component without crashing", () => {
    const result = render(<BoardGrid />);
    expect(result.getByTestId("BoardGridComponent")).toBeInTheDocument();
  });
});
