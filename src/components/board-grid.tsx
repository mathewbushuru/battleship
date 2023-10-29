import { useState } from "react";
import { type ClassValue } from "clsx";

import { cn } from "@/lib/ui-utils";

function BoardCell({
  row,
  col,
  currentShipColorClass,
}: {
  row: number;
  col: number;
  currentShipColorClass: ClassValue;
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  console.log(row, col);

  return (
    <div
      className={cn(
        "border-secondary m-0.5 h-8 w-8 rounded-sm border sm:h-11 sm:w-11",
        isMouseOver && `${currentShipColorClass}`,
      )}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {" "}
    </div>
  );
}

function BoardRow({
  row,
  currentShipColorClass,
}: {
  row: number;
  currentShipColorClass: ClassValue;
}) {
  return (
    <div className="flex">
      {Array(10)
        .fill(null)
        .map((_, colIndex) => {
          return (
            <BoardCell
              key={colIndex}
              row={row}
              col={colIndex}
              currentShipColorClass={currentShipColorClass}
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
            />
          );
        })}
    </div>
  );
}
