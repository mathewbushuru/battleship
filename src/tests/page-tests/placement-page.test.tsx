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
    useLocation: vi.fn().mockReturnValue({pathname: "/placement"})
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
      result.getByRole("button", { name: /rotate ship - x/i }),
    ).toBeInTheDocument();
  });

  it("changes rotate button to show Y axis when clicked", () => {
    const result = render(<PlacementPage />);
    const rotateBtn = result.getByRole("button", {name: /rotate ship/i});
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

  it("places ship svg icons on all cells covered by ship after placement, and not in adjacent ones", async () => {
    const user = userEvent.setup();
    const result = render(<PlacementPage />);
    const carrierCells = [
      result.getByTestId("Row3Col3Cell"),
      result.getByTestId("Row3Col4Cell"),
      result.getByTestId("Row3Col5Cell"),
      result.getByTestId("Row3Col6Cell"),
      result.getByTestId("Row3Col7Cell"),
    ]
    for (let cell of carrierCells) {
      expect(cell.querySelector('svg')).not.toBeInTheDocument();
      expect(cell.textContent).toBe("");
    }
    const adjacentCells = [
      result.getByTestId("Row3Col2Cell"),
      result.getByTestId("Row2Col2Cell"),
      result.getByTestId("Row2Col3Cell"),
      result.getByTestId("Row2Col4Cell"),
      result.getByTestId("Row2Col5Cell"),
      result.getByTestId("Row2Col6Cell"),
      result.getByTestId("Row2Col7Cell"),
      result.getByTestId("Row2Col8Cell"),
      result.getByTestId("Row3Col8Cell"),
      result.getByTestId("Row4Col8Cell"),
      result.getByTestId("Row4Col7Cell"),
      result.getByTestId("Row4Col6Cell"),
      result.getByTestId("Row4Col5Cell"),
      result.getByTestId("Row4Col4Cell"),
      result.getByTestId("Row4Col3Cell"),
      result.getByTestId("Row4Col2Cell"),
    ]
    for (let cell of adjacentCells) {
      expect(cell.querySelector('svg')).not.toBeInTheDocument();
      expect(cell.textContent).toBe("");
    }
    await user.click(result.getByTestId("Row3Col3Cell"));
    for (let cell of carrierCells) {
      expect(cell.querySelector('svg')).toBeInTheDocument();
    }
    for (let cell of adjacentCells) {
      expect(cell.querySelector('svg')).not.toBeInTheDocument();
      expect(cell.textContent).toBe("");
    }
  });

  it("does not place ship if it overlaps with placed cell", async () => {
    let user = userEvent.setup();
    const result = render(<PlacementPage />);
    const carrierCell = result.getByTestId("Row5Col3Cell");
    await user.click(carrierCell);
    expect(carrierCell.querySelector("svg")).toBeInTheDocument();
    const invalidBattleshipCell = result.getByTestId("Row5Col2Cell");
    await user.click(invalidBattleshipCell);
    expect(invalidBattleshipCell.querySelector("svg")).not.toBeInTheDocument();
    const validBattleshipCell = result.getByTestId("Row7Col2Cell");
    await user.click(validBattleshipCell);
    expect(validBattleshipCell.querySelector("svg")).toBeInTheDocument();
  });

  it("does not place ship if it is too close to board edges", async () => {
    let user = userEvent.setup();
    const result = render(<PlacementPage />);
    const invalidCarrierRightCell = result.getByTestId("Row4Col6Cell");
    await user.click(invalidCarrierRightCell);
    expect(invalidCarrierRightCell.querySelector("svg")).not.toBeInTheDocument();
    await user.click(result.getByRole("button", {name: /rotate ship - x/i}));
    const invalidCarrierBottomCell = result.getByTestId("Row6Col4Cell");
    await user.click(invalidCarrierBottomCell);
    expect(invalidCarrierBottomCell.querySelector("svg")).not.toBeInTheDocument();
    const validCarrierCell = result.getByTestId("Row3Col4Cell");
    await user.click(validCarrierCell);
    expect(validCarrierCell.querySelector("svg")).toBeInTheDocument();
  });

  it("places all 5 ships horizontally", async () => {
    let user = userEvent.setup();
    const result = render(<PlacementPage />);
    expect(
      result.getByRole("button", { name: /rotate ship - x/i }),
    ).toBeInTheDocument();
    const carrierCell = result.getByTestId("Row5Col3Cell");
    await user.click(carrierCell);
    expect(carrierCell.querySelector("svg")).toBeInTheDocument();
    const battleshipCell = result.getByTestId("Row2Col1Cell");
    await user.click(battleshipCell);
    expect(battleshipCell.querySelector("svg")).toBeInTheDocument();
    const destroyerCell = result.getByTestId("Row7Col1Cell");
    await user.click(destroyerCell);
    expect(destroyerCell.querySelector("svg")).toBeInTheDocument();
    const submarineCell = result.getByTestId("Row8Col6Cell");
    await user.click(submarineCell);
    expect(submarineCell.querySelector("svg")).toBeInTheDocument();
    const patrollerCell = result.getByTestId("Row0Col6Cell");
    await user.click(patrollerCell);
    expect(patrollerCell.querySelector("svg")).toBeInTheDocument();
    expect(
      result.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
  });

  it("places all ships vertically", async () => {
    let user = userEvent.setup();
    const result = render(<PlacementPage />);
    const rotateBtn = result.getByRole("button", { name: /rotate ship - x/i });
    await user.click(rotateBtn);
    expect(
      result.getByRole("button", { name: /rotate ship - y/i }),
    ).toBeInTheDocument();
    const carrierCell = result.getByTestId("Row4Col7Cell");
    await user.click(carrierCell);
    expect(carrierCell.querySelector("svg")).toBeInTheDocument();
    const battleshipCell = result.getByTestId("Row2Col1Cell");
    await user.click(battleshipCell);
    expect(battleshipCell.querySelector("svg")).toBeInTheDocument();
    const destroyerCell = result.getByTestId("Row6Col3Cell");
    await user.click(destroyerCell);
    expect(destroyerCell.querySelector("svg")).toBeInTheDocument();
    const submarineCell = result.getByTestId("Row1Col5Cell");
    await user.click(submarineCell);
    expect(submarineCell.querySelector("svg")).toBeInTheDocument();
    const patrollerCell = result.getByTestId("Row0Col8Cell");
    await user.click(patrollerCell);
    expect(patrollerCell.querySelector("svg")).toBeInTheDocument();
    expect(
      result.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
  });

  it("places ships in both vertical and horizontal directions", async () => {
    let user = userEvent.setup();
    const result = render(<PlacementPage />);
    expect(
      result.getByRole("button", { name: /rotate ship - x/i }),
    ).toBeInTheDocument();
    const carrierCell = result.getByTestId("Row5Col3Cell");
    await user.click(carrierCell);
    expect(carrierCell.querySelector("svg")).toBeInTheDocument();
    const battleshipCell = result.getByTestId("Row2Col5Cell");
    await user.click(battleshipCell);
    expect(battleshipCell.querySelector("svg")).toBeInTheDocument();
    await user.click(result.getByRole("button", { name: /rotate ship - x/i }));
    expect(
      result.getByRole("button", { name: /rotate ship - y/i }),
    ).toBeInTheDocument();
    const destroyerCell = result.getByTestId("Row6Col1Cell");
    await user.click(destroyerCell);
    expect(destroyerCell.querySelector("svg")).toBeInTheDocument();
    const submarineCell = result.getByTestId("Row1Col2Cell");
    await user.click(submarineCell);
    expect(submarineCell.querySelector("svg")).toBeInTheDocument();
    const patrollerCell = result.getByTestId("Row8Col8Cell");
    await user.click(patrollerCell);
    expect(patrollerCell.querySelector("svg")).toBeInTheDocument();
    expect(
      result.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
  });

  it("after ship placement is complete, clicking start game button navigates to gameplay page", async () => {
    const user = userEvent.setup();
    const rrd = await import("react-router-dom");
    const navigateHookMock = vi.fn();
    rrd.useNavigate = vi.fn().mockImplementation(() => navigateHookMock);
    const result = render(<PlacementPage />);
    expect(
      result.getByRole("button", { name: /rotate ship - x/i }),
    ).toBeInTheDocument();
    const carrierCell = result.getByTestId("Row4Col3Cell");
    await user.click(carrierCell);
    expect(carrierCell.querySelector("svg")).toBeInTheDocument();
    const battleshipCell = result.getByTestId("Row1Col1Cell");
    await user.click(battleshipCell);
    expect(battleshipCell.querySelector("svg")).toBeInTheDocument();
    const destroyerCell = result.getByTestId("Row7Col5Cell");
    await user.click(destroyerCell);
    expect(destroyerCell.querySelector("svg")).toBeInTheDocument();
    const submarineCell = result.getByTestId("Row2Col6Cell");
    await user.click(submarineCell);
    expect(submarineCell.querySelector("svg")).toBeInTheDocument();
    const patrollerCell = result.getByTestId("Row9Col3Cell");
    await user.click(patrollerCell);
    expect(patrollerCell.querySelector("svg")).toBeInTheDocument();
    expect(
      result.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
    await user.click(result.getByRole("button", { name: /start game/i }));
    expect(navigateHookMock).toBeCalledWith("/gameplay");
  });

  it.todo("places ships automatically");
});
