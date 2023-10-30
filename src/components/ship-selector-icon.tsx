import { Ship } from "lucide-react";
import { type ClassValue } from "clsx";

import { cn } from "@/lib/ui-utils";

interface shipSelectorProps {
  name: string;
  cells: number;
  isActive: boolean;
  isOnBoard: boolean;
  shipColorClass: ClassValue;
}

function ShipSelectorIcon({
  name,
  cells,
  isActive = false,
  isOnBoard = false,
  shipColorClass,
}: shipSelectorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-md px-4 py-2",
        isActive && "bg-cyan-50",
        isOnBoard && `bg-secondary text-gray-200 ${shipColorClass}`,
      )}
    >
      <p className="text-sm sm:text-base">{name}</p>
      <div className="flex gap-1">
        {Array(cells)
          .fill(null)
          .map((_, index) => {
            return <Ship className="h-3 w-3 sm:h-4 sm:w-4" key={index} />;
          })}
      </div>
    </div>
  );
}

export default ShipSelectorIcon;
