import ShipBoardBadge from "@/components/ship-board-badge";
import EnemyBoardRow from "./enemy-board-row";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { type ShipState, setShipDataAction } from "@/store/enemy-ship-slice";
import { cn } from "@/lib/ui-utils";
import { useEffect } from "react";

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
    if (!enemyShipData.carrier.alreadyPlaced) {
      const updatedCarrierData = { ...enemyShipData.carrier };
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 6);
      updatedCarrierData.occupiedCells = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
        [row, col + 3],
        [row, col + 4],
      ];
      updatedCarrierData.alreadyPlaced = true;
      setShipData({ ...enemyShipData, carrier: updatedCarrierData });
    } else if (!enemyShipData.battleship.alreadyPlaced) {
      const updatedBattleshipData = { ...enemyShipData.battleship };
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 7);
      updatedBattleshipData.occupiedCells = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
        [row, col + 3],
      ];
      updatedBattleshipData.alreadyPlaced = true;
      setShipData({ ...enemyShipData, battleship: updatedBattleshipData });
    } else if (!enemyShipData.destroyer.alreadyPlaced) {
      const updatedDestroyerData = { ...enemyShipData.destroyer };
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 7);
      updatedDestroyerData.occupiedCells = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
        [row, col + 3],
      ];
      updatedDestroyerData.alreadyPlaced = true;
      setShipData({ ...enemyShipData, destroyer: updatedDestroyerData });
    } else if (!enemyShipData.submarine.alreadyPlaced) {
      const updatedSubmarineData = { ...enemyShipData.submarine };
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 8);
      updatedSubmarineData.occupiedCells = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
      ];
      updatedSubmarineData.alreadyPlaced = true;
      setShipData({ ...enemyShipData, submarine: updatedSubmarineData });
    } else if (!enemyShipData.patroller.alreadyPlaced) {
      const updatedPatrollerData = { ...enemyShipData.patroller };
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 9);
      updatedPatrollerData.occupiedCells = [
        [row, col],
        [row, col + 1],
      ];
      updatedPatrollerData.alreadyPlaced = true;
      setShipData({ ...enemyShipData, patroller: updatedPatrollerData });
    }
  }, [enemyShipData])

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
