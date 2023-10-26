import Header from "@/components/header";
import ShipSelectorIcon from "@/components/ship-selector-icon";

function PlacementPage() {
  return (
    <div className="space-y-4 px-6 py-6">
      <Header />
      <p className="text-center text-lg">Lieutenant, place your Carrier</p>
      <div className="flex justify-center flex-wrap gap-y-2 sm:px-12 sm:justify-between lg:justify-center lg:gap-x-12">
        <ShipSelectorIcon name="Carrier" cells={5} isActive={true} />
        <ShipSelectorIcon name="Battleship" cells={4} />
        <ShipSelectorIcon name="Destroyer" cells={3} />
        <ShipSelectorIcon name="Submarine" cells={3} />
        <ShipSelectorIcon name="Patroller" cells={2} />
      </div>
    </div>
  );
}

export default PlacementPage;
