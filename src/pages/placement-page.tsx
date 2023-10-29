import Header from "@/components/header";
import ShipSelectorIcon from "@/components/ship-selector-icon";
import BoardGrid from "@/components/board-grid";

function PlacementPage() {
  return (
    <div className="px-6 py-6">
      <Header />
      <p className="text-center text-lg mt-4">Lieutenant, place your Carrier</p>
      <div className="flex justify-center flex-wrap gap-y-2 mt-4 sm:px-12 sm:justify-between lg:justify-center lg:gap-x-12">
        <ShipSelectorIcon name="Carrier" cells={5} isActive={true} />
        <ShipSelectorIcon name="Battleship" cells={4} />
        <ShipSelectorIcon name="Destroyer" cells={3} />
        <ShipSelectorIcon name="Submarine" cells={3} />
        <ShipSelectorIcon name="Patroller" cells={2} />
      </div>
      <BoardGrid className="mt-8" />
    </div>
  );
}

export default PlacementPage;
