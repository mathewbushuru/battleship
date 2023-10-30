import useStore from "@/store/use-store";

import Header from "@/components/header";
import ShipSelectorIcon from "@/components/ship-selector-icon";
import BoardGrid from "@/components/board-grid";

function PlacementPage() {
  const shipData = useStore((state) => state.shipData);

  const currentShip = useStore((state) => state.currentShip);

  return (
    <div className="px-6 py-6">
      <Header />
      <p className="mt-4 text-center text-base sm:text-lg">
        Lieutenant, place your {currentShip.name}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-y-2 sm:justify-between sm:px-12 lg:justify-center lg:gap-x-12">
        <ShipSelectorIcon
          name={shipData.carrier.name}
          cells={shipData.carrier.numOfCells}
          isActive={shipData.carrier.beingPlaced}
          isOnBoard={shipData.carrier.alreadyPlaced}
          shipColorClass={shipData.carrier.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.battleship.name}
          cells={shipData.battleship.numOfCells}
          isActive={shipData.battleship.beingPlaced}
          isOnBoard={shipData.battleship.alreadyPlaced}
          shipColorClass={shipData.battleship.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.destroyer.name}
          cells={shipData.destroyer.numOfCells}
          isActive={shipData.destroyer.beingPlaced}
          isOnBoard={shipData.destroyer.alreadyPlaced}
          shipColorClass={shipData.destroyer.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.submarine.name}
          cells={shipData.submarine.numOfCells}
          isActive={shipData.submarine.beingPlaced}
          isOnBoard={shipData.submarine.alreadyPlaced}
          shipColorClass={shipData.submarine.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.patroller.name}
          cells={shipData.patroller.numOfCells}
          isActive={shipData.patroller.beingPlaced}
          isOnBoard={shipData.patroller.alreadyPlaced}
          shipColorClass={shipData.patroller.shipColorClass}
        />
      </div>
      <BoardGrid className="mt-8" />
    </div>
  );
}

export default PlacementPage;
