import usePlacementStore from "@/store/use-placement-store";

import Header from "@/components/header";
import ShipSelectorIcon from "@/components/ship-selector-icon";
import BoardGrid from "@/components/board-grid";

function PlacementPage() {
  const allShips = [
    { name: "Carrier", shipColorClass: "bg-amber-500", cells: 5 },
    { name: "Battleship", shipColorClass: "bg-teal-500", cells: 4 },
    { name: "Destroyer", shipColorClass: "bg-cyan-500", cells: 3 },
    { name: "Submarine", shipColorClass: "bg-indigo-500", cells: 3 },
    { name: "Patroller", shipColorClass: "bg-rose-500", cells: 2 },
  ];
  const placedShips: string[] = [];
  // const currentShip = allShips.shift() as {
  //   name: string;
  //   shipColorClass: string;
  //   cells: number;
  // };
  const currentShip = usePlacementStore((state: any) => state.currentShip);

  return (
    <div className="px-6 py-6">
      <Header />
      <p className="mt-4 text-center text-base sm:text-lg">
        Lieutenant, place your {currentShip.name}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-y-2 sm:justify-between sm:px-12 lg:justify-center lg:gap-x-12">
        <ShipSelectorIcon
          name="Carrier"
          cells={5}
          isActive={currentShip.name === "Carrier"}
          isOnBoard={placedShips.some((ship) => ship === "Carrier")}
          shipColorClass="bg-amber-500"
        />
        <ShipSelectorIcon
          name="Battleship"
          cells={4}
          isActive={currentShip.name === "Battleship"}
          isOnBoard={placedShips.some((ship) => ship === "Battleship")}
          shipColorClass="bg-teal-500"
        />
        <ShipSelectorIcon
          name="Destroyer"
          cells={3}
          isActive={currentShip.name === "Destroyer"}
          isOnBoard={placedShips.some((ship) => ship === "Destroyer")}
          shipColorClass="bg-cyan-500"
        />
        <ShipSelectorIcon
          name="Submarine"
          cells={3}
          isActive={currentShip.name === "Submarine"}
          isOnBoard={placedShips.some((ship) => ship === "Submarine")}
          shipColorClass="bg-indigo-500"
        />
        <ShipSelectorIcon
          name="Patroller"
          cells={2}
          isActive={currentShip.name === "Patroller"}
          isOnBoard={placedShips.some((ship) => ship === "Patroller")}
          shipColorClass="bg-rose-500"
        />
      </div>
      <BoardGrid className="mt-8" />
    </div>
  );
}

export default PlacementPage;
