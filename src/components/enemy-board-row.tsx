import EnemyBoardCell from "./enemy-board-cell";

import { useAppSelector } from "@/store/store";

export default function EnemyBoardRow({ row }: { row: number }) {
  const mouseOverCoords = useAppSelector(
    (state) => state.enemyShip.mouseOverCoords,
  );

  return (
    <div className="flex" data-testid="EnemyBoardRowComponent">
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
            />
          );
        })}
    </div>
  );
}
