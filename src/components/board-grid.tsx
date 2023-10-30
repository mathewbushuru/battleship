import { useState } from "react";

import usePlacementStore from "@/store/use-placement-store";

import { cn } from "@/lib/ui-utils";

function BoardCell({
  row,
  col,
  isMouseOver,
  setMouseOverCoords,
  isValidPlacement,
}: {
  row: number;
  col: number;
  isMouseOver: boolean;
  setMouseOverCoords: React.Dispatch<
    React.SetStateAction<{
      row: number | null;
      col: number | null;
    }>
  >;
  isValidPlacement: boolean;
}) {
  const currentShip = usePlacementStore(state => state.currentShip);
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

function BoardRow({
  row,
  mouseOverCoords,
  setMouseOverCoords,
}: {
  row: number;
  mouseOverCoords: { row: number | null; col: number | null };
  setMouseOverCoords: React.Dispatch<
    React.SetStateAction<{
      row: number | null;
      col: number | null;
    }>
  >;
}) {
  const currentShip = usePlacementStore(state => state.currentShip);
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
              setMouseOverCoords={setMouseOverCoords}
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
  const [mouseOverCoords, setMouseOverCoords] = useState<{
    row: number | null;
    col: number | null;
  }>({ row: null, col: null });

  console.log(mouseOverCoords);

  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      {Array(10)
        .fill(null)
        .map((_, rowIndex) => {
          return (
            <BoardRow
              key={rowIndex}
              row={rowIndex}
              mouseOverCoords={mouseOverCoords}
              setMouseOverCoords={setMouseOverCoords}
            />
          );
        })}
    </div>
  );
}
