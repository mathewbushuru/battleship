import ShipBoardBadge from "@/components/ship-board-badge";
import EnemyBoardRow from "./enemy-board-row";
import { useAppSelector } from "@/store/store";
import { cn } from "@/lib/ui-utils";

interface enemyBoardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EnemyBoardGrid({
  className,
  ...props
}: enemyBoardGridProps) {
  const enemyShipData = useAppSelector(state => state.enemyShip.shipData);

  return (
    <div
      data-testid="EnemyBoardGridComponent"
      className={cn(
        "mx-auto flex w-fit flex-col-reverse gap-2 rounded-md bg-secondary px-1 py-4 sm:flex-row sm:px-2 sm:py-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap justify-center gap-2 px-2 sm:flex-col">
        <ShipBoardBadge
          shipName="Carrier"
          alreadyPlaced={enemyShipData.carrier.alreadyPlaced}
          alreadySunk={enemyShipData.carrier.alreadySunk}
          className="bg-amber-500"
        />
        <ShipBoardBadge
          shipName="Battleship"
          alreadyPlaced={enemyShipData.battleship.alreadyPlaced}
          alreadySunk={enemyShipData.battleship.alreadySunk}
          className="bg-teal-500"
        />
        <ShipBoardBadge
          shipName="Destroyer"
          alreadyPlaced={enemyShipData.destroyer.alreadyPlaced}
          alreadySunk={enemyShipData.destroyer.alreadySunk}
          className="bg-cyan-500"
        />
        <ShipBoardBadge
          shipName="Submarine"
          alreadyPlaced={enemyShipData.submarine.alreadyPlaced}
          alreadySunk={enemyShipData.submarine.alreadySunk}
          className="bg-indigo-500"
        />
        <ShipBoardBadge
          shipName="Patroller"
          alreadyPlaced={enemyShipData.patroller.alreadyPlaced}
          alreadySunk={enemyShipData.patroller.alreadySunk}
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
