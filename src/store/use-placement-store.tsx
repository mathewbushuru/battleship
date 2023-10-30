import { create } from "zustand";

interface shipType {
  name: string;
  shipColorClass: string;
  cells: number;
}

type state = {
  currentShip: shipType;
};

type actions = {
  setCurrentShip: (nextShip: shipType) => void;
};

const usePlacementStore = create<state & actions>((set) => ({
  currentShip: { name: "Carrier", shipColorClass: "bg-amber-500", cells: 5 },
  setCurrentShip: (nextShip: shipType) =>
    set(() => ({ currentShip: nextShip })),
}));

export default usePlacementStore;
