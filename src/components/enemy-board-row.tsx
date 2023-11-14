import EnemyBoardCell from "./enemy-board-cell";

import { useAppSelector } from "@/store/store";

export default function EnemyBoardRow({ row }: { row: number }) {
  const currentShip = useAppSelector((state) => state.enemyShip.currentShip);
  const mouseOverCoords = useAppSelector(state => state.enemyShip.mouseOverCoords);
  const placementDirection = useAppSelector(
    (state) => state.enemyShip.placementDirection,
  );

  return (
    <div className="flex" data-testid="BoardRowComponent">
      {Array(10)
        .fill(null)
        .map((_, col) => {
          return (
            <EnemyBoardCell
              key={col}
              row={row}
              col={col}
              isMouseOver={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                mouseOverCoords.row === row &&
                mouseOverCoords.col === col
              }
              isValidPlacement={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                (placementDirection === "row"
                  ? mouseOverCoords.col + (currentShip.cells - 1) < 10
                  : mouseOverCoords.row + (currentShip.cells - 1) < 10)
              }
            />
          );
        })}
    </div>
  );
}
