import { Ship, CircleDashed, CircleDotDashed } from "lucide-react";

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

  const isHitCarrierCell = shipData.carrier.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitBattleshipCell = shipData.battleship.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitDestroyerCell = shipData.destroyer.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitSubmarineCell = shipData.submarine.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitPatrollerCell = shipData.patroller.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );

  const isSuccessfullyHit =
    isHitCarrierCell ||
    isHitBattleshipCell ||
    isHitDestroyerCell ||
    isHitSubmarineCell ||
    isHitPatrollerCell;

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
  const isHitCell = isSuccessfullyHit || isMissedHitCell;

  let cellContent: React.ReactNode = "";

  if (
    isHitCarrierCell ||
    isHitBattleshipCell ||
    isHitDestroyerCell ||
    isHitSubmarineCell ||
    isHitPatrollerCell
  ) {
    cellContent = (
      <CircleDotDashed className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
    );
  } else if (
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

  const shipIsAlreadySunk =
    (isCarrierCell && shipData.carrier.alreadySunk) ||
    (isBattleshipCell && shipData.battleship.alreadySunk) ||
    (isDestroyerCell && shipData.destroyer.alreadySunk) ||
    (isSubmarineCell && shipData.submarine.alreadySunk) ||
    (isPatrollerCell && shipData.patroller.alreadySunk);

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
      dispatch(addMissedHitCellAction([row, col]));
      return;
    }

    const updatedShipData = JSON.parse(
      JSON.stringify(shipData),
    ) as ShipState["shipData"];
    if (isCarrierCell) {
      updatedShipData.carrier.hitCells.push([row, col]);
      updatedShipData.carrier.alreadySunk =
        updatedShipData.carrier.numOfCells ===
        updatedShipData.carrier.hitCells.length;
    } else if (isBattleshipCell) {
      updatedShipData.battleship.hitCells.push([row, col]);
      updatedShipData.battleship.alreadySunk =
        updatedShipData.battleship.numOfCells ===
        updatedShipData.battleship.hitCells.length;
    } else if (isDestroyerCell) {
      updatedShipData.destroyer.hitCells.push([row, col]);
      updatedShipData.destroyer.alreadySunk =
        updatedShipData.destroyer.numOfCells ===
        updatedShipData.destroyer.hitCells.length;
    } else if (isSubmarineCell) {
      updatedShipData.submarine.hitCells.push([row, col]);
      updatedShipData.submarine.alreadySunk =
        updatedShipData.submarine.numOfCells ===
        updatedShipData.submarine.hitCells.length;
    } else if (isPatrollerCell) {
      updatedShipData.patroller.hitCells.push([row, col]);
      updatedShipData.patroller.alreadySunk =
        updatedShipData.patroller.numOfCells ===
        updatedShipData.patroller.hitCells.length;
    }
    setShipData(updatedShipData);
  };

  return (
    <div
      className={cn(
        "opacity-85 m-[1px] flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-secondary bg-background text-gray-200 sm:m-0.5 sm:h-11 sm:w-11",
        isCarrierCell && shipIsAlreadySunk && shipData.carrier.shipColorClass,
        isBattleshipCell &&
          shipIsAlreadySunk &&
          shipData.battleship.shipColorClass,
        isDestroyerCell &&
          shipIsAlreadySunk &&
          shipData.destroyer.shipColorClass,
        isSubmarineCell &&
          shipIsAlreadySunk &&
          shipData.submarine.shipColorClass,
        isPatrollerCell &&
          shipIsAlreadySunk &&
          shipData.patroller.shipColorClass,
        isMouseOver && isHitCell && "cursor-not-allowed",
        isMouseOver && !isHitCell && "bg-emerald-500",
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
