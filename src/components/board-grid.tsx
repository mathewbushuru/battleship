import { useState } from "react";
import { type ClassValue } from "clsx";

import { cn } from "@/lib/ui-utils";

function BoardCell({
  row,
  col,
  currentShipColorClass,
  isMouseOver,
  setMouseOverCoords,
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
}) {
  return (
    <div
      className={cn(
        "m-0.5 h-8 w-8 rounded-sm border border-secondary sm:h-11 sm:w-11",
        isMouseOver && `${currentShipColorClass}`,
      )}
      onMouseOver={() => setMouseOverCoords({ row, col })}
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
                col < mouseOverCoords.col + 5
              }
              currentShipColorClass={currentShipColorClass}
              setMouseOverCoords={setMouseOverCoords}
            />
          );
        })}
    </div>
  );
}

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  currentShipColorClass: ClassValue;
}

export default function BoardGrid({
  className,
  currentShipColorClass,
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
            />
          );
        })}
    </div>
  );
}
