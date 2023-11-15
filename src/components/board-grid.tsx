import { useLocation } from "react-router-dom";
import { Shuffle, ListRestart } from "lucide-react";

import BoardRow from "@/components/board-row";
import ShipBoardBadge from "@/components/ship-board-badge";
import Button from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  setShipDataAction,
  setCurrentShipAction,
  setNextShipsToBePlacedAction,
  clearShipsPlacementAction,
  type ShipState,
} from "@/store/ship-slice";
import { placeShipsAutomatically } from "@/lib/game-utils";
import { cn } from "@/lib/ui-utils";

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const shipData = useAppSelector((state) => state.ship.shipData);
  const turn = useAppSelector((state) => state.gameplay.turn);

  const setShipData = (updatedShipData: ShipState["shipData"]) => {
    dispatch(setShipDataAction(updatedShipData));
  };
  const setCurrentShip = (nextShip: ShipState["currentShip"]) => {
    dispatch(setCurrentShipAction(nextShip));
  };
  const setNextShipsToBePlaced = (
    updatedNextShips: ShipState["nextShipsToBePlaced"],
  ) => {
    dispatch(setNextShipsToBePlacedAction(updatedNextShips));
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
    setCurrentShip({ name: "COMPLETE", shipColorClass: "", cells: 0 });
    setNextShipsToBePlaced([]);
  };

  const handleClearPlacement = () => {
    dispatch(clearShipsPlacementAction());
  };

  return (
    <div
      data-testid="BoardGridComponent"
      className={cn(
        "mx-auto flex w-fit flex-col-reverse gap-2 rounded-md bg-secondary px-1 py-4 sm:flex-row sm:px-2 sm:py-2",
        turn === "player" &&
          location.pathname === "/gameplay" &&
          "cursor-not-allowed opacity-75",
        className,
      )}
      {...props}
    >
      {location.pathname === "/placement" && (
        <div className="space-x-2 self-center sm:hidden">
          <Button
            size="xs"
            className="h-6 text-[0.5rem] font-normal "
            onClick={handleRandomizeShips}
          >
            Randomize
            <Shuffle className="ml-1 h-2 w-2" />
          </Button>
          <Button
            size="xs"
            className="h-6 text-[0.5rem] font-normal"
            onClick={handleClearPlacement}
          >
            Clear
            <ListRestart className="ml-1 h-2 w-2" />
          </Button>
        </div>
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
              className="hidden gap-1 font-normal uppercase sm:flex"
              onClick={handleRandomizeShips}
            >
              Randomize
              <Shuffle className="h-3 w-3" />
            </Button>
            <Button
              size="xs"
              className="hidden gap-1 font-normal uppercase sm:flex"
              onClick={handleClearPlacement}
            >
              Clear
              <ListRestart className="h-3 w-3" />
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
