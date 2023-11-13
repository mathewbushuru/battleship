import BoardRow from "@/components/board-row";
import ShipBoardBadge from "@/components/ship-board-badge";
import { useAppSelector } from "@/store/store";
import { cn } from "@/lib/ui-utils";

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  const shipData = useAppSelector((state) => state.ship.shipData);

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
      <ShipBoardBadge
          shipName="Carrier"
          alreadyPlaced={shipData.carrier.alreadyPlaced}
          alreadySunk={shipData.carrier.alreadySunk}
          className="bg-amber-500"
        />
        <ShipBoardBadge
          shipName="Battleship"
          alreadyPlaced={shipData.battleship.alreadyPlaced}
          alreadySunk={shipData.battleship.alreadySunk}
          className="bg-teal-500"
        />
        <ShipBoardBadge
          shipName="Destroyer"
          alreadyPlaced={shipData.destroyer.alreadyPlaced}
          alreadySunk={shipData.destroyer.alreadySunk}
          className="bg-cyan-500"
        />
        <ShipBoardBadge
          shipName="Submarine"
          alreadyPlaced={shipData.submarine.alreadyPlaced}
          alreadySunk={shipData.submarine.alreadySunk}
          className="bg-indigo-500"
        />
        <ShipBoardBadge
          shipName="Patroller"
          alreadyPlaced={shipData.patroller.alreadyPlaced}
          alreadySunk={shipData.patroller.alreadySunk}
          className="bg-rose-500"
        />
      </div>
      <div className="flex flex-col items-center">
        {Array(10)
          .fill(null)
          .map((_, rowIndex) => {
            return <BoardRow key={rowIndex} row={rowIndex} />;
          })}
      </div>
    </div>
  );
}
