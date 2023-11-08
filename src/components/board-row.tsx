// import useStore from "@/store/use-store";
import { useAppSelector } from "@/store/store";
import BoardCell from "@/components/board-cell";

export default function BoardRow({ row }: { row: number }) {
  // const currentShip = useStore((state) => state.currentShip);
  const currentShip = useAppSelector((state) => state.ship.currentShip);
  // const mouseOverCoords = useStore((state) => state.mouseOverCoords);
  const mouseOverCoords = useAppSelector(state => state.ship.mouseOverCoords);
  // const placementDirection = useStore((state) => state.placementDirection);
  const placementDirection = useAppSelector(
    (state) => state.ship.placementDirection,
  );

  return (
    <div className="flex" data-testid="BoardRowComponent">
      {Array(10)
        .fill(null)
        .map((_, col) => {
          const allCoveredCells =
            placementDirection === "row"
              ? row === mouseOverCoords.row &&
                col >= mouseOverCoords.col! &&
                col < mouseOverCoords.col! + currentShip.cells
              : col === mouseOverCoords.col &&
                row >= mouseOverCoords.row! &&
                row < mouseOverCoords.row! + currentShip.cells;
          return (
            <BoardCell
              key={col}
              row={row}
              col={col}
              isMouseOver={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                allCoveredCells
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
