import { Ship, CircleDashed } from "lucide-react";
// CircleDotDashed

import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  type ShipState,
  setMouseOverCoordsAction,
  setShipDataAction,
  addMissedHitCellAction,
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
  const missedHitCells = useAppSelector(
    (state) => state.enemyShip.missedHitCells,
  );

  const setMouseOverCoords = (newCoords: ShipState["mouseOverCoords"]) => {
    dispatch(setMouseOverCoordsAction(newCoords));
  };
  const setShipData = (updatedShipData: ShipState["shipData"]) => {
    dispatch(setShipDataAction(updatedShipData));
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

  const isMissedHitCell = missedHitCells.some(
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
  } else if (isMissedHitCell) {
    cellContent = (
      <CircleDashed className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
    );
  }

  const handleShotFired = () => {
    if (
      !(
        isCarrierCell ||
        isBattleshipCell ||
        isDestroyerCell ||
        isSubmarineCell ||
        isPatrollerCell
      )
    ) {
      // misfired shot
      dispatch(addMissedHitCellAction([row, col]));
    }
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
        isMouseOver && isMissedHitCell && "cursor-not-allowed",
        isMouseOver && isMissedHitCell && "bg-red-500",
        isMouseOver && !isMissedHitCell && "bg-emerald-600",
      )}
      onMouseEnter={() => setMouseOverCoords({ row, col })}
      onMouseLeave={() => setMouseOverCoords({ row: null, col: null })}
      onClick={handleShotFired}
      data-testid={`EnemyRow${row}Col${col}Cell`}
    >
      {cellContent}
    </div>
  );
}
