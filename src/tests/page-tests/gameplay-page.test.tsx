import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import GamePlayPage from "@/pages/gameplay-page";

describe("/gameplay route", () => {
  afterEach(cleanup);

  it("renders gameplay page without crashing", () => {
    const result = render(<GamePlayPage />);
    expect(result.getByTestId("GameplayPage")).toBeInTheDocument();
  });
});
