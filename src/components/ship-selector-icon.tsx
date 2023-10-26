import { Ship } from "lucide-react";

import { cn } from "@/lib/ui-utils";

interface shipSelectorProps {
  name: string;
  cells: number;
  isActive?: boolean;
}

function ShipSelectorIcon({
  name,
  cells,
  isActive = false,
}: shipSelectorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-md px-4 py-2",
        isActive && "border border-primary bg-stone-200",
      )}
    >
      <p className="">{name}</p>
      <div className="flex gap-1">
        {Array(cells)
          .fill(null)
          .map((_, index) => {
            return <Ship className="h-4 w-4" key={index} />;
          })}
      </div>
    </div>
  );
}

export default ShipSelectorIcon;
