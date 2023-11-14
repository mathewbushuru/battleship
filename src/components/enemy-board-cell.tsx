import { Ship } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  type ShipState,
  setMouseOverCoordsAction,
} from "@/store/enemy-ship-slice";
import { cn } from "@/lib/ui-utils";

export default function EnemyBoardCell({
  row,
  col,
  isMouseOver,
}: {
  row: number;
  col: number;
  isMouseOver: boolean;
}) {
  const dispatch = useAppDispatch();

  const shipData = useAppSelector((state) => state.enemyShip.shipData);

  const setMouseOverCoords: (
    newCoords: ShipState["mouseOverCoords"],
  ) => void = (newCoords) => {
    dispatch(setMouseOverCoordsAction(newCoords));
  };

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

  let cellContent: React.ReactNode = "";

  if (
    isCarrierCell ||
    isBattleshipCell ||
    isDestroyerCell ||
    isSubmarineCell ||
    isPatrollerCell
  ) {
    cellContent = <Ship className="h-4 w-4 sm:h-5 sm:w-5" />;
  }

  const handleClick = () => {
    return;
  };

  return (
    <div
      className={cn(
        "opacity-85 m-[1px] flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-secondary bg-background text-gray-200 sm:m-0.5 sm:h-11 sm:w-11",
        isCarrierCell && shipData.carrier.shipColorClass,
        isBattleshipCell && shipData.battleship.shipColorClass,
        isDestroyerCell && shipData.destroyer.shipColorClass,
        isSubmarineCell && shipData.submarine.shipColorClass,
        isPatrollerCell && shipData.patroller.shipColorClass,
        isMouseOver && "bg-red-800",
      )}
      onMouseEnter={() => setMouseOverCoords({ row, col })}
      onMouseLeave={() => setMouseOverCoords({ row: null, col: null })}
      onClick={handleClick}
      data-testid={`EnemyRow${row}Col${col}Cell`}
    >
      {cellContent}
    </div>
  );
}
