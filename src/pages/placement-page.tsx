import useStore from "@/store/use-store";

import Header from "@/components/header";
import ShipSelectorIcon from "@/components/ship-selector-icon";
import BoardGrid from "@/components/board-grid";
import Typewriter from "@/components/typewriter";

function PlacementPage() {
  const shipData = useStore((state) => state.shipData);
  const currentShip = useStore((state) => state.currentShip);

  let welcomeMessage: string;

  if (currentShip.name === "COMPLETE") {
    welcomeMessage =
      "Thanks lieutenant, attack formation is in place. Reorder the ships or let's enter the battle.";
  } else {
    welcomeMessage = `Lieutenant, place your ${currentShip.name.toLowerCase()}...`;
  }

  return (
    <div className="px-6 py-6">
      <Header />
      <Typewriter text={welcomeMessage} className="mt-2" />
      <div className="mt-4 flex flex-wrap justify-center gap-x-1 gap-y-2 sm:justify-between sm:px-12 lg:justify-center lg:gap-x-12">
        <ShipSelectorIcon
          name={shipData.carrier.name}
          cells={shipData.carrier.numOfCells}
          isActive={currentShip.name === "Carrier"}
          isOnBoard={shipData.carrier.alreadyPlaced}
          shipColorClass={shipData.carrier.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.battleship.name}
          cells={shipData.battleship.numOfCells}
          isActive={currentShip.name === "Battleship"}
          isOnBoard={shipData.battleship.alreadyPlaced}
          shipColorClass={shipData.battleship.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.destroyer.name}
          cells={shipData.destroyer.numOfCells}
          isActive={currentShip.name === "Destroyer"}
          isOnBoard={shipData.destroyer.alreadyPlaced}
          shipColorClass={shipData.destroyer.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.submarine.name}
          cells={shipData.submarine.numOfCells}
          isActive={currentShip.name === "Submarine"}
          isOnBoard={shipData.submarine.alreadyPlaced}
          shipColorClass={shipData.submarine.shipColorClass}
        />
        <ShipSelectorIcon
          name={shipData.patroller.name}
          cells={shipData.patroller.numOfCells}
          isActive={currentShip.name === "Patroller"}
          isOnBoard={shipData.patroller.alreadyPlaced}
          shipColorClass={shipData.patroller.shipColorClass}
        />
      </div>
      <BoardGrid className="mt-8" />
    </div>
  );
}

export default PlacementPage;
