import { useLocation } from "react-router-dom";
import { Shuffle } from "lucide-react";

import BoardRow from "@/components/board-row";
import ShipBoardBadge from "@/components/ship-board-badge";
import Button from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setShipDataAction, type ShipState } from "@/store/ship-slice";
import { placeShipsAutomatically } from "@/lib/game-utils";
import { cn } from "@/lib/ui-utils";

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const shipData = useAppSelector((state) => state.ship.shipData);

  const setShipData = (updatedShipData: ShipState["shipData"]) => {
    dispatch(setShipDataAction(updatedShipData));
  };

  const handleRandomizeShips = () => {
    const updatedShipData = JSON.parse(
      JSON.stringify(shipData),
    ) as ShipState["shipData"];
    const {
      carrierCells,
      battleshipCells,
      destroyerCells,
      submarineCells,
      patrollerCells,
    } = placeShipsAutomatically();
    updatedShipData.carrier.occupiedCells = carrierCells;
    updatedShipData.carrier.alreadyPlaced = true;
    updatedShipData.battleship.occupiedCells = battleshipCells;
    updatedShipData.battleship.alreadyPlaced = true;
    updatedShipData.destroyer.occupiedCells = destroyerCells;
    updatedShipData.destroyer.alreadyPlaced = true;
    updatedShipData.submarine.occupiedCells = submarineCells;
    updatedShipData.submarine.alreadyPlaced = true;
    updatedShipData.patroller.occupiedCells = patrollerCells;
    updatedShipData.patroller.alreadyPlaced = true;
    setShipData(updatedShipData);
  };

  return (
    <div
      data-testid="BoardGridComponent"
      className={cn(
        "mx-auto flex w-fit flex-col-reverse gap-2 rounded-md bg-secondary px-1 py-4 sm:flex-row sm:px-2 sm:py-2",
        className,
      )}
      {...props}
    >
      {location.pathname === "/placement" && (
        <Button
          size="xs"
          className="self-center font-normal sm:hidden"
          onClick={handleRandomizeShips}
        >
          Randomise
          <Shuffle className="ml-1 h-3 w-3" />
        </Button>
      )}
      <div className="flex flex-wrap justify-center gap-2 px-2 sm:flex-col sm:py-4">
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

        {location.pathname === "/placement" && (
          <>
            <div className="hidden flex-1 sm:flex" />
            <Button
              size="xs"
              className="hidden gap-1 self-center font-normal uppercase sm:flex"
              onClick={handleRandomizeShips}
            >
              Randomize
              <Shuffle className="h-3 w-3" />
            </Button>
          </>
        )}
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
