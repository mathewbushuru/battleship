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
  const setMouseOverCoords = useStore((state) => state.setMouseOverCoords);
  const shipData = useStore((state) => state.shipData);
  const setShipData = useStore((state) => state.setShipData);

  const isCarrierCell = shipData.carrier.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isBattleShipCell = shipData.battleship.occupiedCells.some(
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

  if (
    isCarrierCell ||
    isBattleShipCell ||
    isDestroyerCell ||
    isSubmarineCell ||
    isPatrollerCell
  ) {
    isValidPlacement = false;
  }

  const handleClick = () => {
    if (!isValidPlacement) {
      return;
    }
    const updatedData = { ...shipData };
    const currentShipName =
      currentShip.name.toLowerCase() as keyof typeof updatedData;
    const occupiedCells = [];
    for (let i = 0; i < currentShip.cells; i++) {
      occupiedCells.push([row, col + i]);
    }
    updatedData[currentShipName].occupiedCells = occupiedCells;
    updatedData[currentShipName].beingPlaced = false;
    updatedData[currentShipName].alreadyPlaced = true;
    setShipData(updatedData);
  };

  return (
    <div
      className={cn(
        "m-0.5 h-8 w-8 cursor-pointer rounded-sm border border-secondary sm:h-11 sm:w-11",
        isMouseOver && `${currentShip.shipColorClass}`,
        !isValidPlacement && `cursor-not-allowed opacity-80`,
        isCarrierCell && shipData.carrier.shipColorClass,
        isBattleShipCell && shipData.battleship.shipColorClass,
        isDestroyerCell && shipData.destroyer.shipColorClass,
        isSubmarineCell && shipData.submarine.shipColorClass,
        isPatrollerCell && shipData.patroller.shipColorClass,
      )}
      onMouseEnter={() => setMouseOverCoords({ row, col })}
      onMouseLeave={() => setMouseOverCoords({ row: null, col: null })}
      onClick={handleClick}
    >
      {" "}
    </div>
  );
}

function BoardRow({ row }: { row: number }) {
  const currentShip = useStore((state) => state.currentShip);
  const mouseOverCoords = useStore((state) => state.mouseOverCoords);
  return (
    <div className="flex">
      {Array(10)
        .fill(null)
        .map((_, col) => {
          return (
            <BoardCell
              key={col}
              row={row}
              col={col}
              isMouseOver={
                mouseOverCoords.col !== null &&
                mouseOverCoords.row !== null &&
                row === mouseOverCoords.row &&
                col >= mouseOverCoords.col &&
                col < mouseOverCoords.col + currentShip.cells
              }
              isValidPlacement={
                mouseOverCoords.col !== null &&
                mouseOverCoords.col + (currentShip.cells - 1) < 10
              }
            />
          );
        })}
    </div>
  );
}

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      {Array(10)
        .fill(null)
        .map((_, rowIndex) => {
          return <BoardRow key={rowIndex} row={rowIndex} />;
        })}
    </div>
  );
}
