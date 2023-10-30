import { create } from "zustand";

interface shipType {
  name: string;
  shipColorClass: string;
  cells: number;
}

const usePlacementStore = create((set) => ({
  currentShip: { name: "Carrier", shipColorClass: "bg-amber-500", cells: 5 },
//   currentShip: { name: "Patroller", shipColorClass: "bg-rose-500", cells: 2 },
  setCurrentShip: (nextShip: shipType) =>
    set(() => ({ currentShip: nextShip })),
}));

export default usePlacementStore;
