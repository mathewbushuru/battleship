import { Ship, CheckCheck } from "lucide-react";

import useStore from "@/store/use-store";
import { cn } from "@/lib/ui-utils";

function BoardCell({
  row,
  col,
  isMouseOver,
  isValidPlacement,
}: {
  row: number;
  col: number;
  isMouseOver: boolean;
  isValidPlacement: boolean;
}) {
  const currentShip = useStore((state) => state.currentShip);
  const setCurrentShip = useStore((state) => state.setCurrentShip);
  const setMouseOverCoords = useStore((state) => state.setMouseOverCoords);
  const shipData = useStore((state) => state.shipData);
  const setShipData = useStore((state) => state.setShipData);
  const nextShipsToBePlaced = useStore((state) => state.nextShipsToBePlaced);
  const setNextShipsToBePlaced = useStore(
    (state) => state.setNextShipsToBePlaced,
  );
  const placementDirection = useStore((state) => state.placementDirection);

  let willOverlapWithCarrierCells,
    willOverlapWithBattleshipCells,
    willOverlapWithDestroyerCells,
    willOverlapWithSubmarineCells,
    willOverlapWithPatrollerCells;

  let isOccupiedCell = false;

  for (let i = 0; i < currentShip.cells; i++) {
    willOverlapWithCarrierCells = shipData.carrier.occupiedCells.some(
      placementDirection === "row"
        ? (el) => el[0] === row && el[1] === col + i
        : (el) => el[0] === row + i && el[1] === col,
    );
    if (willOverlapWithCarrierCells) {
      isOccupiedCell = true;
      break;
    }

    willOverlapWithBattleshipCells = shipData.battleship.occupiedCells.some(
      placementDirection === "row"
        ? (el) => el[0] === row && el[1] === col + i
        : (el) => el[0] === row + i && el[1] === col,
    );
    if (willOverlapWithBattleshipCells) {
      isOccupiedCell = true;
      break;
    }

    willOverlapWithDestroyerCells = shipData.destroyer.occupiedCells.some(
      placementDirection === "row"
        ? (el) => el[0] === row && el[1] === col + i
        : (el) => el[0] === row + i && el[1] === col,
    );
    if (willOverlapWithDestroyerCells) {
      isOccupiedCell = true;
      break;
    }

    willOverlapWithSubmarineCells = shipData.submarine.occupiedCells.some(
      placementDirection === "row"
        ? (el) => el[0] === row && el[1] === col + i
        : (el) => el[0] === row + i && el[1] === col,
    );
    if (willOverlapWithSubmarineCells) {
      isOccupiedCell = true;
      break;
    }

    willOverlapWithPatrollerCells = shipData.patroller.occupiedCells.some(
      placementDirection === "row"
        ? (el) => el[0] === row && el[1] === col + i
        : (el) => el[0] === row + i && el[1] === col,
    );
    if (willOverlapWithPatrollerCells) {
      isOccupiedCell = true;
      break;
    }
  }

  if (isOccupiedCell) {
    isValidPlacement = false;
  }

  const isCarrierCell = shipData.carrier.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isBattleshipCell = shipData.battleship.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isDestroyerCell = shipData.destroyer.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isSubmarineCell = shipData.submarine.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isPatrollerCell = shipData.patroller.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );

  let cellContent: React.ReactNode = " ";

  if (
    isCarrierCell ||
    isBattleshipCell ||
    isDestroyerCell ||
    isSubmarineCell ||
    isPatrollerCell
  ) {
    isValidPlacement = false;
    cellContent = <Ship className="h-4 w-4 sm:h-5 sm:w-5" />;
  }

  const isPlacementComplete =
    nextShipsToBePlaced.length === 0 && currentShip.name === "COMPLETE";

  if (isPlacementComplete) {
    isValidPlacement = false;
  }

  const handleClick = () => {
    if (!isValidPlacement || isPlacementComplete) {
      return;
    }

    const updatedData = { ...shipData };
    const currentShipName =
      currentShip.name.toLowerCase() as keyof typeof updatedData;
    const occupiedCells = [];
    for (let i = 0; i < currentShip.cells; i++) {
      if (placementDirection === "row") {
        occupiedCells.push([row, col + i]);
      } else {
        occupiedCells.push([row + i, col]);
      }
    }
    updatedData[currentShipName].occupiedCells = occupiedCells;
    updatedData[currentShipName].alreadyPlaced = true;
    setShipData(updatedData);

    const updatedNextShips = [...nextShipsToBePlaced];
    const nextShip = updatedNextShips.shift();
    if (nextShip !== undefined) {
      setCurrentShip(nextShip);
    } else {
      setCurrentShip({ name: "COMPLETE", shipColorClass: "", cells: 0 });
    }
    setNextShipsToBePlaced(updatedNextShips);
  };

  return (
    <div
      className={cn(
        "opacity-85 m-[1px] flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-secondary bg-background text-gray-200 sm:m-0.5 sm:h-11 sm:w-11",
        isMouseOver && !isPlacementComplete && `${currentShip.shipColorClass}`,
        !isValidPlacement && `cursor-not-allowed`,
        isCarrierCell && shipData.carrier.shipColorClass,
        isBattleshipCell && shipData.battleship.shipColorClass,
        isDestroyerCell && shipData.destroyer.shipColorClass,
        isSubmarineCell && shipData.submarine.shipColorClass,
        isPatrollerCell && shipData.patroller.shipColorClass,
      )}
      onMouseEnter={() => setMouseOverCoords({ row, col })}
      onMouseLeave={() => setMouseOverCoords({ row: null, col: null })}
      onClick={handleClick}
    >
      {cellContent}
    </div>
  );
}

function BoardRow({ row }: { row: number }) {
  const currentShip = useStore((state) => state.currentShip);
  const mouseOverCoords = useStore((state) => state.mouseOverCoords);
  const placementDirection = useStore((state) => state.placementDirection);

  return (
    <div className="flex">
      {Array(10)
        .fill(null)
        .map((_, col) => {
          const totalCoveredCells =
            placementDirection === "row"
              ? row === mouseOverCoords.row &&
                col >= mouseOverCoords.col! &&
                col < mouseOverCoords.col! + currentShip.cells
              : col === mouseOverCoords.col &&
                row >= mouseOverCoords.row! &&
                row < mouseOverCoords.row! + currentShip.cells;
          return (
            <BoardCell
              key={col}
              row={row}
              col={col}
              isMouseOver={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                totalCoveredCells
              }
              isValidPlacement={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                (placementDirection === "row"
                  ? mouseOverCoords.col + (currentShip.cells - 1) < 10
                  : mouseOverCoords.row + (currentShip.cells - 1) < 10)
              }
            />
          );
        })}
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
        <CheckCheck className="h-3 w-3" />
      ) : (
        <div className="w-3" />
      )}
    </div>
  );
}

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  const shipData = useStore((state) => state.shipData);
  return (
    <div
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
            return <BoardRow key={rowIndex} row={rowIndex} />;
          })}
      </div>
    </div>
  );
}
