import { X} from "lucide-react";

import EnemyBoardRow from "./enemy-board-row";
import { useAppSelector } from "@/store/store";
import { cn } from "@/lib/ui-utils";

interface enemyBoardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EnemyBoardGrid({
  className,
  ...props
}: enemyBoardGridProps) {
  const shipData = useAppSelector((state) => state.enemyShip.shipData);

  return (
    <div
      data-testid="BoardGridComponent"
      className={cn(
        "mx-auto flex w-fit flex-col-reverse gap-2 rounded-md bg-secondary px-1 py-4 sm:flex-row sm:px-2 sm:py-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap justify-center gap-2 px-2 sm:flex-col">
        <ShipBadge
          shipName="Carrier"
          alreadyPlaced={shipData.carrier.alreadyPlaced}
          className="bg-amber-500"
        />
        <ShipBadge
          shipName="Battleship"
          alreadyPlaced={shipData.battleship.alreadyPlaced}
          className="bg-teal-500"
        />
        <ShipBadge
          shipName="Destroyer"
          alreadyPlaced={shipData.destroyer.alreadyPlaced}
          className="bg-cyan-500"
        />
        <ShipBadge
          shipName="Submarine"
          alreadyPlaced={shipData.submarine.alreadyPlaced}
          className="bg-indigo-500"
        />
        <ShipBadge
          shipName="Patroller"
          alreadyPlaced={shipData.patroller.alreadyPlaced}
          className="bg-rose-500"
        />
      </div>
      <div className="flex flex-col items-center">
        {Array(10)
          .fill(null)
          .map((_, rowIndex) => {
            return <EnemyBoardRow key={rowIndex} row={rowIndex} />;
          })}
      </div>
    </div>
  );
}

interface shipBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  shipName: string;
  alreadyPlaced: boolean;
}

function ShipBadge({ shipName, alreadyPlaced, className }: shipBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-sm px-1 py-1 text-xs text-gray-200",
        className,
      )}
    >
      <p>{shipName}</p>
      {alreadyPlaced ? (
        <X className="h-3 w-3" />
      ) : (
        <div className="w-3" />
      )}
    </div>
  );
}