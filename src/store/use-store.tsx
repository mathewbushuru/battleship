import { create } from "zustand";
import { type ClassValue } from "clsx";

interface currentShipType {
  name: string;
  shipColorClass: ClassValue;
  cells: number;
}

interface shipDataType {
  name: string;
  shipColorClass: string;
  cells: number;
  beingPlaced: boolean;
  alreadyPlaced: boolean;
}

type state = {
  currentShip: currentShipType;
  shipData: {
    carrier: shipDataType;
    battleship: shipDataType;
    destroyer: shipDataType;
    submarine: shipDataType;
    patroller: shipDataType;
  };
  mouseOverCoords: {
    row: number | null;
    col: number | null;
  };
};

type actions = {
  setCurrentShip: (nextShip: currentShipType) => void;
  setShipData: (updatedShipData: state["shipData"]) => void;
  setMouseOverCoords: (newCoords: state["mouseOverCoords"]) => void;
};

const useStore = create<state & actions>((set) => ({
  currentShip: { name: "Carrier", shipColorClass: "bg-amber-500", cells: 5 },
  setCurrentShip: (nextShip: currentShipType) =>
    set(() => ({ currentShip: nextShip })),
  shipData: {
    carrier: {
      name: "Carrier",
      shipColorClass: "bg-amber-500",
      cells: 5,
      beingPlaced: true,
      alreadyPlaced: false,
    },
    battleship: {
      name: "Battleship",
      shipColorClass: "bg-teal-500",
      cells: 4,
      beingPlaced: false,
      alreadyPlaced: false,
    },
    destroyer: {
      name: "Destroyer",
      shipColorClass: "bg-cyan-500",
      cells: 3,
      beingPlaced: false,
      alreadyPlaced: false,
    },
    submarine: {
      name: "Submarine",
      shipColorClass: "bg-indigo-500",
      cells: 3,
      beingPlaced: false,
      alreadyPlaced: false,
    },
    patroller: {
      name: "Patroller",
      shipColorClass: "bg-rose-500",
      cells: 2,
      beingPlaced: false,
      alreadyPlaced: false,
    },
  },
  setShipData: (updatedShipData) => set(() => ({ shipData: updatedShipData })),
  mouseOverCoords: {
    row: null,
    col: null,
  },
  setMouseOverCoords: (newCoords) =>
    set(() => ({ mouseOverCoords: newCoords })),
}));

export default useStore;
export { type shipDataType };
