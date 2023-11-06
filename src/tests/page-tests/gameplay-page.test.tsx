import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";

import GamePlayPage from "@/pages/gameplay-page";

describe("/gameplay route", () => {
  afterEach(cleanup);

  it("renders gameplay page without crashing", () => {
    const result = render(<GamePlayPage />);
    expect(result.getByTestId("GameplayPage")).toBeInTheDocument();
  });
});
