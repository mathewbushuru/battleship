import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/react";

import PlacementPage from "@/pages/placement-page";
import useStore from "@/store/use-store";

vi.mock("react-router-dom", async (importOrig) => {
  const actualModule: any = await importOrig();
  return {
    ...actualModule,
    useNavigate: vi.fn(),
  };
});

vi.mock("@/store/use-store", async (importOrig) => {
  const useStoreActual = await importOrig<typeof useStore>();

  return {
    ...useStoreActual,
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

  it("cell is empty before ship placement", () => {
    const result = render(<PlacementPage />);

    expect(result.getByTestId("Row5Col3Cell")).toHaveTextContent("");
  });

  it("cell has ship svg  icon after ship placement", async () => {
    const result = render(<PlacementPage />);
    const cell = result.getByTestId("Row5Col3Cell");
    expect(cell).toHaveTextContent("");
  });
});
