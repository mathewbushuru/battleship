import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "@/tests/test-utils";
import PlacementPage from "@/pages/placement-page";

vi.mock("react-router-dom", async (importOrig) => {
  const actualModule: any = await importOrig();
  return {
    ...actualModule,
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

  it("cell is empty before ship placement", () => {
    const result = render(<PlacementPage />);

    expect(result.getByTestId("Row5Col3Cell")).toHaveTextContent("");
  });

  it("cell has ship svg  icon after ship placement", async () => {
    const user = userEvent.setup();
    const result = render(<PlacementPage />);
    const cell = result.getByTestId("Row5Col3Cell");
    expect(cell).toHaveTextContent("");
    await user.click(cell);
    expect(cell.querySelector("svg")).toBeInTheDocument();
  });

  it("rotates placement direction from row to column, places all 5 ships, then changes place button to start game button, and navigates to gameplay page when start game is clicked", async () => {
    const user = userEvent.setup();
    const rrd = await import("react-router-dom");
    const navigateHookMock = vi.fn();
    rrd.useNavigate = vi.fn().mockImplementation(() => navigateHookMock);
    const result = render(<PlacementPage />);
    expect(
      result.getByRole("button", { name: /rotate ship - x/i }),
    ).toBeInTheDocument();
    await user.click(result.getByRole("button", { name: /rotate ship - x/i }));
    expect(
      result.getByRole("button", { name: /rotate ship - y/i }),
    ).toBeInTheDocument();
    const carrierCell = result.getByTestId("Row2Col3Cell");
    await user.click(carrierCell);
    const battleshipCell = result.getByTestId("Row6Col0Cell");
    await user.click(battleshipCell);
    const destroyerCell = result.getByTestId("Row0Col5Cell");
    await user.click(destroyerCell);
    const submarineCell = result.getByTestId("Row3Col9Cell");
    await user.click(submarineCell);
    const patrollerCell = result.getByTestId("Row8Col7Cell");
    await user.click(patrollerCell);
    expect(
      result.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
    await user.click(result.getByRole("button", { name: /start game/i }));
    expect(navigateHookMock).toBeCalledWith("/gameplay");
  });
});
