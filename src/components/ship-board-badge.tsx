import { CheckCheck, X } from "lucide-react";
import { cn } from "@/lib/ui-utils";

interface shipBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  shipName: string;
  alreadyPlaced: boolean;
  alreadySunk: boolean;
}

export default function ShipBoardBadge({
  shipName,
  alreadyPlaced,
  alreadySunk,
  className,
  ...props
}: shipBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-sm px-1 py-1 text-xs text-gray-200",
        alreadySunk && "line-through",
        className,
      )}
      {...props}
    >
      <p>{shipName}</p>
      {alreadySunk ? (
        <X className="h-3 w-3" />
      ) : alreadyPlaced ? (
        <CheckCheck className="h-3 w-3" />
      ) : (
        <div className="w-3" />
      )}
    </div>
  );
}
