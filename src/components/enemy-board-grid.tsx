import { useEffect } from "react";

import ShipBoardBadge from "@/components/ship-board-badge";
import EnemyBoardRow from "./enemy-board-row";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { type ShipState, setShipDataAction } from "@/store/enemy-ship-slice";
import { cn } from "@/lib/ui-utils";

interface enemyBoardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EnemyBoardGrid({
  className,
  ...props
}: enemyBoardGridProps) {
  const dispatch = useAppDispatch();

  const enemyShipData = useAppSelector((state) => state.enemyShip.shipData);

  const setShipData: (updatedShipData: ShipState["shipData"]) => void = (
    updatedShipData,
  ) => {
    dispatch(setShipDataAction(updatedShipData));
  };

  useEffect(() => {
    const updatedShipData = JSON.parse(
      JSON.stringify(enemyShipData),
    ) as ShipState["shipData"];
    let row, col;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 6);
    const enemyCarrierCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
      [row, col + 4],
    ];
    updatedShipData.carrier.occupiedCells = enemyCarrierCells;
    updatedShipData.carrier.alreadyPlaced = true;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 7);
    const enemyBattleshipCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
    ];
    updatedShipData.battleship.occupiedCells = enemyBattleshipCells;
    updatedShipData.battleship.alreadyPlaced = true;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 8);
    const enemyDestroyerCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
    ];
    updatedShipData.destroyer.occupiedCells = enemyDestroyerCells;
    updatedShipData.destroyer.alreadyPlaced = true;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 8);
    const enemySubmarineCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
    ];
    updatedShipData.submarine.occupiedCells = enemySubmarineCells;
    updatedShipData.submarine.alreadyPlaced = true;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 9);
    const enemyPatrollerCells = [
      [row, col],
      [row, col + 1],
    ];
    updatedShipData.patroller.occupiedCells = enemyPatrollerCells;
    updatedShipData.patroller.alreadyPlaced = true;

    setShipData(updatedShipData);
  }, []);

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
