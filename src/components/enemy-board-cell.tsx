import { Ship, CircleDashed, CircleDotDashed } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  type ShipState,
  setMouseOverCoordsAction,
  setShipDataAction as setEnemyShipDataAction,
  addMissedHitCellAction,
  updateComputerPlaysAction,
} from "@/store/enemy-ship-slice";
import {
  type ShipState as FriendlyShipState,
  setShipDataAction as setFriendlyShipDataAction,
  addMissedComputerHitCellAction,
} from "@/store/ship-slice";
import { toggleTurnAction } from "@/store/gameplay-slice";
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

  const enemyShipData = useAppSelector((state) => state.enemyShip.shipData);
  const playerShipData = useAppSelector((state) => state.ship.shipData);
  const missedHitCells = useAppSelector(
    (state) => state.enemyShip.missedHitCells,
  );
  const turn = useAppSelector((state) => state.gameplay.turn);
  const computerCellsNextToHit = useAppSelector(
    (state) => state.enemyShip.computerCellsNextToHit,
  );

  const setMouseOverCoords = (newCoords: ShipState["mouseOverCoords"]) => {
    dispatch(setMouseOverCoordsAction(newCoords));
  };
  const setEnemyShipData = (updatedShipData: ShipState["shipData"]) => {
    dispatch(setEnemyShipDataAction(updatedShipData));
  };
  const setFriendlyShipData = (
    updatedShipData: FriendlyShipState["shipData"],
  ) => {
    dispatch(setFriendlyShipDataAction(updatedShipData));
  };

  const isHitCarrierCell = enemyShipData.carrier.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitBattleshipCell = enemyShipData.battleship.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitDestroyerCell = enemyShipData.destroyer.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitSubmarineCell = enemyShipData.submarine.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isHitPatrollerCell = enemyShipData.patroller.hitCells.some(
    (el) => el[0] === row && el[1] === col,
  );

  const isSuccessfullyHit =
    isHitCarrierCell ||
    isHitBattleshipCell ||
    isHitDestroyerCell ||
    isHitSubmarineCell ||
    isHitPatrollerCell;

  const isCarrierCell = enemyShipData.carrier.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isBattleshipCell = enemyShipData.battleship.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isDestroyerCell = enemyShipData.destroyer.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isSubmarineCell = enemyShipData.submarine.occupiedCells.some(
    (el) => el[0] === row && el[1] === col,
  );
  const isPatrollerCell = enemyShipData.patroller.occupiedCells.some(
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
    (isCarrierCell && enemyShipData.carrier.alreadySunk) ||
    (isBattleshipCell && enemyShipData.battleship.alreadySunk) ||
    (isDestroyerCell && enemyShipData.destroyer.alreadySunk) ||
    (isSubmarineCell && enemyShipData.submarine.alreadySunk) ||
    (isPatrollerCell && enemyShipData.patroller.alreadySunk);

  const computerPlayTurn = () => {
    dispatch(toggleTurnAction());
    const updatedPlaysArr = [...computerCellsNextToHit];
    const nextHitCell = updatedPlaysArr.pop();

    console.log(nextHitCell);
    if (nextHitCell === undefined) {
      return;
    }
    const updatedPlayerShipData = JSON.parse(
      JSON.stringify(playerShipData),
    ) as FriendlyShipState["shipData"];
    let isPlayerCarrierHit = playerShipData.carrier.occupiedCells.some(
      (el) => el[0] === nextHitCell[0] && el[1] === nextHitCell[1],
    );
    let isPlayerBattleshipHit = playerShipData.battleship.occupiedCells.some(
      (el) => el[0] === nextHitCell[0] && el[1] === nextHitCell[1],
    );
    let isPlayerDestroyerHit = playerShipData.destroyer.occupiedCells.some(
      (el) => el[0] === nextHitCell[0] && el[1] === nextHitCell[1],
    );
    let isPlayerSubmarineHit = playerShipData.submarine.occupiedCells.some(
      (el) => el[0] === nextHitCell[0] && el[1] === nextHitCell[1],
    );
    let isPlayerPatrollerHit = playerShipData.submarine.occupiedCells.some(
      (el) => el[0] === nextHitCell[0] && el[1] === nextHitCell[1],
    );
    if (isPlayerCarrierHit) {
      updatedPlayerShipData.carrier.hitCells.push(nextHitCell);
      updatedPlayerShipData.carrier.alreadySunk =
        updatedPlayerShipData.carrier.numOfCells ===
        updatedPlayerShipData.carrier.hitCells.length;
      setFriendlyShipData(updatedPlayerShipData);
    } else if (isPlayerBattleshipHit) {
      updatedPlayerShipData.battleship.hitCells.push(nextHitCell);
      updatedPlayerShipData.battleship.alreadySunk =
        updatedPlayerShipData.battleship.numOfCells ===
        updatedPlayerShipData.battleship.hitCells.length;
      setFriendlyShipData(updatedPlayerShipData);
    } else if (isPlayerDestroyerHit) {
      updatedPlayerShipData.destroyer.hitCells.push(nextHitCell);
      updatedPlayerShipData.destroyer.alreadySunk =
        updatedPlayerShipData.destroyer.numOfCells ===
        updatedPlayerShipData.destroyer.hitCells.length;
      setFriendlyShipData(updatedPlayerShipData);
    } else if (isPlayerSubmarineHit) {
      updatedPlayerShipData.submarine.hitCells.push(nextHitCell);
      updatedPlayerShipData.submarine.alreadySunk =
        updatedPlayerShipData.submarine.numOfCells ===
        updatedPlayerShipData.submarine.hitCells.length;
      setFriendlyShipData(updatedPlayerShipData);
    } else if (isPlayerPatrollerHit) {
      updatedPlayerShipData.patroller.hitCells.push(nextHitCell);
      updatedPlayerShipData.patroller.alreadySunk =
        updatedPlayerShipData.patroller.numOfCells ===
        updatedPlayerShipData.patroller.hitCells.length;
      setFriendlyShipData(updatedPlayerShipData);
    } else {
      dispatch(addMissedComputerHitCellAction(nextHitCell));
    }

    setTimeout(() => {
      dispatch(updateComputerPlaysAction(updatedPlaysArr));
      dispatch(toggleTurnAction());
    }, 500);
  };

  const handleShotFired = () => {
    if (turn === "enemy") {
      return;
    }

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
      computerPlayTurn();
      return;
    }

    const updatedShipData = JSON.parse(
      JSON.stringify(enemyShipData),
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
    setEnemyShipData(updatedShipData);
    computerPlayTurn();
  };

  return (
    <div
      className={cn(
        "opacity-85 m-[1px] flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-secondary bg-background text-gray-200 sm:m-0.5 sm:h-11 sm:w-11",
        isCarrierCell &&
          shipIsAlreadySunk &&
          enemyShipData.carrier.shipColorClass,
        isBattleshipCell &&
          shipIsAlreadySunk &&
          enemyShipData.battleship.shipColorClass,
        isDestroyerCell &&
          shipIsAlreadySunk &&
          enemyShipData.destroyer.shipColorClass,
        isSubmarineCell &&
          shipIsAlreadySunk &&
          enemyShipData.submarine.shipColorClass,
        isPatrollerCell &&
          shipIsAlreadySunk &&
          enemyShipData.patroller.shipColorClass,
        isMouseOver && isHitCell && "cursor-not-allowed",
        turn === "enemy" && "cursor-not-allowed",
        isMouseOver && !isHitCell && turn === "player" && "bg-emerald-500",
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
