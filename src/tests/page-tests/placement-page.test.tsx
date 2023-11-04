import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/react";

import PlacementPage from "@/pages/placement-page";

vi.mock("react-router-dom", async (importOrig) => {
  const mod: any = await importOrig();
  return {
    ...mod,
    useNavigate: vi.fn(),
  };
});

describe("/placement route", () => {
  afterEach(cleanup);

  it("renders placement page without crashing", () => {
    const result = render(<PlacementPage />);
    expect(result.getByTestId("PlacementPage")).toBeInTheDocument();
  });

  it("renders header component", () => {
    const result = render(<PlacementPage />);
    expect(result.getByTestId("HeaderComponent")).toBeInTheDocument();
  });

  it("displays the correct button when placement is ongoing", () => {
    const result = render(<PlacementPage />);
    expect(
      result.getByRole("button", { name: /rotate ship/i }),
    ).toBeInTheDocument();
  });

  it("changes rotate button to show Y axis when clicked", () => {
    const result = render(<PlacementPage />);
    const rotateBtn = result.getByRole("button");
    expect(rotateBtn.textContent).toBe("Rotate ship - X");
    fireEvent.click(rotateBtn);
    expect(rotateBtn.textContent).toBe("Rotate ship - Y");
    fireEvent.click(rotateBtn);
    expect(rotateBtn.textContent).toBe("Rotate ship - X");
  });
});
