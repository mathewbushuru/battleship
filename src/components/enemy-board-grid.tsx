import { useEffect } from "react";

import ShipBoardBadge from "@/components/ship-board-badge";
import EnemyBoardRow from "./enemy-board-row";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { type ShipState, setShipDataAction } from "@/store/enemy-ship-slice";
import { cn } from "@/lib/ui-utils";
import { placeShipsAutomatically } from "@/lib/game-utils";

interface enemyBoardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EnemyBoardGrid({
  className,
  ...props
}: enemyBoardGridProps) {
  const dispatch = useAppDispatch();

  const enemyShipData = useAppSelector((state) => state.enemyShip.shipData);
  const turn = useAppSelector(state => state.gameplay.turn)

  const setShipData: (updatedShipData: ShipState["shipData"]) => void = (
    updatedShipData,
  ) => {
    dispatch(setShipDataAction(updatedShipData));
  };

  useEffect(() => {
    const updatedShipData = JSON.parse(
      JSON.stringify(enemyShipData),
    ) as ShipState["shipData"];

    const {
      carrierCells,
      battleshipCells,
      destroyerCells,
      submarineCells,
      patrollerCells,
    } = placeShipsAutomatically();

    updatedShipData.carrier.occupiedCells = carrierCells;
    updatedShipData.battleship.occupiedCells = battleshipCells;
    updatedShipData.destroyer.occupiedCells = destroyerCells;
    updatedShipData.submarine.occupiedCells = submarineCells;
    updatedShipData.patroller.occupiedCells = patrollerCells;

    setShipData(updatedShipData);
  }, []);

  return (
    <div
      data-testid="EnemyBoardGridComponent"
      className={cn(
        "mx-auto flex w-fit flex-col-reverse gap-2 rounded-md bg-secondary px-1 py-4 sm:flex-row sm:px-2 sm:py-2",
        turn === "enemy" && "opacity-75 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap justify-center gap-2 px-2 sm:flex-col">
        <ShipBoardBadge
          shipName="Carrier"
          alreadyPlaced={false}
          alreadySunk={enemyShipData.carrier.alreadySunk}
          className="bg-amber-500"
        />
        <ShipBoardBadge
          shipName="Battleship"
          alreadyPlaced={false}
          alreadySunk={enemyShipData.battleship.alreadySunk}
          className="bg-teal-500"
        />
        <ShipBoardBadge
          shipName="Destroyer"
          alreadyPlaced={false}
          alreadySunk={enemyShipData.destroyer.alreadySunk}
          className="bg-cyan-500"
        />
        <ShipBoardBadge
          shipName="Submarine"
          alreadyPlaced={false}
          alreadySunk={enemyShipData.submarine.alreadySunk}
          className="bg-indigo-500"
        />
        <ShipBoardBadge
          shipName="Patroller"
          alreadyPlaced={false}
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
