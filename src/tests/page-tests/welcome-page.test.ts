import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import App from "@/App";

describe("/ route", () => {
  it("renders welcome page for root route", () => {
    const result = render(App());

    expect(result.getByTestId("App")).toHaveTextContent("Battleship");
    expect(result.getByTestId("WelcomePage")).toBeInTheDocument();
  });
});