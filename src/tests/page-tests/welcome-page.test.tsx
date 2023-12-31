import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, fireEvent } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import App from "@/App";
import WelcomePage from "@/pages/welcome-page";
import quotes from "@/lib/quotes";

vi.mock("react-router-dom", async (importOriginal) => {
  const mod: any = await importOriginal();
  return {
    ...mod,
    useNavigate: vi.fn(),
  };
});

describe("/ route", async () => {
  afterEach(cleanup);

  it("renders welcome page for root route", () => {
    const result = render(App());
    expect(result.getByTestId("App")).toBeInTheDocument();
    expect(result.getByTestId("WelcomePage")).toBeInTheDocument();
  });

  it("renders welcome page without crashing", () => {
    const result = render(<WelcomePage />);
    expect(result.getByTestId("WelcomePage")).toBeInTheDocument();
  });

  it("renders the Header component", () => {
    const result = render(<WelcomePage />);
    expect(result.getByText("Battleship")).toBeInTheDocument();
  });

  it("renders a quote and an author", () => {
    const result = render(<WelcomePage />);
    const displayedQuote = result.getByTestId("blockquote").textContent;
    const isQuotePresent = quotes.start.some(
      (q) => displayedQuote?.includes(q.quote),
    );
    expect(isQuotePresent).toBe(true);

    const displayedAuthor = result.getByTestId("author").textContent;
    const isAuthorPresent = quotes.start.some(
      (q) => displayedAuthor?.includes(q.author),
    );
    expect(isAuthorPresent).toBe(true);
  });

  it("renders rank dropdown with expected options", () => {
    const result = render(<WelcomePage />);
    const selectTrigger = result.getByTestId("trigger");
    fireEvent.click(selectTrigger);
    expect(result.getByText("Lieutenant")).toBeInTheDocument();
  });

  it("renders the unlock hint", () => {
    const result = render(<WelcomePage />);
    expect(
      result.getByText("Win more battles to unlock higher difficulties"),
    ).toBeInTheDocument();
  });

  it("renders the enter battle button", () => {
    const result = render(<WelcomePage />);
    expect(
      result.getByRole("button", { name: /enter battle/i }),
    ).toBeInTheDocument();
  });

  it("navigates to placement page when enter battle button is clicked", async () => {
    const rrd = await import("react-router-dom");
    const navigateHookMock = vi.fn();
    rrd.useNavigate = vi.fn().mockImplementation(() => navigateHookMock);
    const result = render(<WelcomePage />);
    const enterBattleBtn = result.getByRole("button", {
      name: /enter battle/i,
    });
    fireEvent.click(enterBattleBtn);
    expect(navigateHookMock).toBeCalledWith("/placement");
  });
});
