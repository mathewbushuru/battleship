import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { fireEvent, cleanup } from "@testing-library/react";

import { render } from "@/tests/test-utils";
import ErrorPage from "@/pages/error-page";

vi.mock("react-router-dom");

describe("route error page", async () => {
  const rrd = await import("react-router-dom");

  beforeEach(async () => {
    rrd.useRouteError = vi.fn();
    rrd.useNavigate = vi.fn();
    rrd.isRouteErrorResponse =
      vi.fn() as unknown as typeof rrd.isRouteErrorResponse;
  });

  afterEach(() => {
    cleanup();
  });

  it("displays router error response", () => {
    rrd.useRouteError = vi
      .fn()
      .mockReturnValue({ statusText: "Not Found", status: 404 });
    rrd.isRouteErrorResponse = vi
      .fn()
      .mockReturnValue(true) as unknown as typeof rrd.isRouteErrorResponse;

    const result = render(<ErrorPage />);
    expect(result.getByText("Not Found")).toBeInTheDocument();
  });

  it("displays router error response when statusText is missing", () => {
    rrd.useRouteError = vi.fn().mockReturnValue({ status: 404 });
    rrd.isRouteErrorResponse = vi
      .fn()
      .mockReturnValue(true) as unknown as typeof rrd.isRouteErrorResponse;

    const result = render(<ErrorPage />);
    expect(result.getByText(404)).toBeInTheDocument();
  });

  it("displays standard error response", () => {
    const standardError = new Error("Standard error occurred");
    rrd.useRouteError = vi.fn().mockReturnValue(standardError);

    const result = render(<ErrorPage />);
    expect(result.getByText("Standard error occurred")).toBeInTheDocument();
  });

  it("displays an unexpected error", () => {
    rrd.useRouteError = vi.fn().mockReturnValue("Unexpected error type");

    const result = render(<ErrorPage />);
    expect(
      result.getByText("Sorry, an unexpected error has occurred."),
    ).toBeInTheDocument();
  });

  it("navigates back when 'Go back' is clicked", () => {
    const navigateHookMock = vi.fn();
    rrd.useNavigate = vi.fn().mockReturnValue(navigateHookMock);
    const result = render(<ErrorPage />);

    fireEvent.click(result.getByText("Go back"));
    expect(navigateHookMock).toHaveBeenCalled();
    expect(navigateHookMock).toHaveBeenCalledTimes(1);
    expect(navigateHookMock).toHaveBeenCalledWith(-1);
  });

  it("navigates to home when 'Go home' is clicked", () => {
    const navigateHookMock = vi.fn();
    rrd.useNavigate = vi.fn().mockReturnValue(navigateHookMock);

    const result = render(<ErrorPage />);
    fireEvent.click(result.getByText("Go home"));
    expect(navigateHookMock).toHaveBeenCalledWith("/");
  });
});
