import { useState } from "react";
import { type ClassValue } from "clsx";

import { cn } from "@/lib/ui-utils";

function BoardCell({
  row,
  col,
  currentShipColorClass,
  isMouseOver,
  setMouseOverCoords,
  isValidPlacement,
}: {
  row: number;
  col: number;
  currentShipColorClass: ClassValue;
  isMouseOver: boolean;
  setMouseOverCoords: React.Dispatch<
    React.SetStateAction<{
      row: number | null;
      col: number | null;
    }>
  >;
  isValidPlacement: boolean;
}) {
  return (
    <div
      className={cn(
        "m-0.5 h-8 w-8 cursor-pointer rounded-sm border border-secondary sm:h-11 sm:w-11",
        isMouseOver && `${currentShipColorClass}`,
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
  currentShipColorClass,
  mouseOverCoords,
  setMouseOverCoords,
  numOfShipCells
}: {
  row: number;
  currentShipColorClass: ClassValue;
  mouseOverCoords: { row: number | null; col: number | null };
  setMouseOverCoords: React.Dispatch<
    React.SetStateAction<{
      row: number | null;
      col: number | null;
    }>
  >;
  numOfShipCells: number;
}) {
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
                col < mouseOverCoords.col + numOfShipCells
              }
              currentShipColorClass={currentShipColorClass}
              setMouseOverCoords={setMouseOverCoords}
              isValidPlacement={
                mouseOverCoords.col !== null && mouseOverCoords.col + (numOfShipCells - 1) < 10
              }
            />
          );
        })}
    </div>
  );
}

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  currentShipColorClass: ClassValue;
  numOfShipCells: number;
}

export default function BoardGrid({
  className,
  currentShipColorClass,
  numOfShipCells,
  ...props
}: boardGridProps) {
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
              currentShipColorClass={currentShipColorClass}
              mouseOverCoords={mouseOverCoords}
              setMouseOverCoords={setMouseOverCoords}
              numOfShipCells = {numOfShipCells}
            />
          );
        })}
    </div>
  );
}
