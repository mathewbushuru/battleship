import useStore from "@/store/use-store";

import { cn } from "@/lib/ui-utils";

function BoardCell({
  row,
  col,
  isMouseOver,
  isValidPlacement,
}: {
  row: number;
  col: number;
  isMouseOver: boolean;
  isValidPlacement: boolean;
}) {
  const currentShip = useStore((state) => state.currentShip);
  const setMouseOverCoords = useStore((state) => state.setMouseOverCoords);

  return (
    <div
      className={cn(
        "m-0.5 h-8 w-8 cursor-pointer rounded-sm border border-secondary sm:h-11 sm:w-11",
        isMouseOver && `${currentShip.shipColorClass}`,
        !isValidPlacement && `cursor-not-allowed opacity-80`,
      )}
      onMouseEnter={() => setMouseOverCoords({ row, col })}
      onMouseLeave={() => setMouseOverCoords({ row: null, col: null })}
    >
      {" "}
    </div>
  );
}

function BoardRow({ row }: { row: number }) {
  const currentShip = useStore((state) => state.currentShip);
  const mouseOverCoords = useStore((state) => state.mouseOverCoords);
  return (
    <div className="flex">
      {Array(10)
        .fill(null)
        .map((_, col) => {
          return (
            <BoardCell
              key={col}
              row={row}
              col={col}
              isMouseOver={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                row === mouseOverCoords.row &&
                col >= mouseOverCoords.col &&
                col < mouseOverCoords.col + currentShip.cells
              }
              isValidPlacement={
                mouseOverCoords.col !== null &&
                mouseOverCoords.col + (currentShip.cells - 1) < 10
              }
            />
          );
        })}
    </div>
  );
}

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      {Array(10)
        .fill(null)
        .map((_, rowIndex) => {
          return <BoardRow key={rowIndex} row={rowIndex} />;
        })}
    </div>
  );
}
