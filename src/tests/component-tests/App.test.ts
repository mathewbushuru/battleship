import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "@/App";

describe("App component", () => {
  it("should render the app", () => {
    const result = render(App());

    expect(screen.getByText("welcome-page")).toBeVisible();
    expect(screen.getByTestId("App")).not.toBeEmptyDOMElement();
    expect(result.getByTestId("App")).toHaveTextContent("welcome-page");

    // const { getByTestId } = render(App());
    // expect(getByTestId("App")).toBeInTheDocument();
  });
});
