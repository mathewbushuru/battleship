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
  numOfCells: number;
  occupiedCells: number[][];
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
  nextShipsToBePlaced: {
    name: string;
    shipColorClass: string;
    cells: number;
  }[];
  placementDirection: "row" | "column";
};

type actions = {
  setCurrentShip: (nextShip: currentShipType) => void;
  setShipData: (updatedShipData: state["shipData"]) => void;
  setMouseOverCoords: (newCoords: state["mouseOverCoords"]) => void;
  setNextShipsToBePlaced: (
    updatedNextShips: state["nextShipsToBePlaced"],
  ) => void;
  setPlacementDirection: (newDirection: state["placementDirection"]) => void;
};

const useStore = create<state & actions>((set) => ({
  currentShip: { name: "Carrier", shipColorClass: "bg-amber-500", cells: 5 },
  setCurrentShip: (nextShip: currentShipType) =>
    set(() => ({ currentShip: nextShip })),
  shipData: {
    carrier: {
      name: "Carrier",
      shipColorClass: "bg-amber-500",
      numOfCells: 5,
      occupiedCells: [],
      alreadyPlaced: false,
    },
    battleship: {
      name: "Battleship",
      shipColorClass: "bg-teal-500",
      numOfCells: 4,
      occupiedCells: [],
      alreadyPlaced: false,
    },
    destroyer: {
      name: "Destroyer",
      shipColorClass: "bg-cyan-500",
      numOfCells: 3,
      occupiedCells: [],
      alreadyPlaced: false,
    },
    submarine: {
      name: "Submarine",
      shipColorClass: "bg-indigo-500",
      numOfCells: 3,
      occupiedCells: [],
      alreadyPlaced: false,
    },
    patroller: {
      name: "Patroller",
      shipColorClass: "bg-rose-500",
      numOfCells: 2,
      occupiedCells: [],
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
  nextShipsToBePlaced: [
    { name: "Battleship", shipColorClass: "bg-teal-500", cells: 4 },
    { name: "Destroyer", shipColorClass: "bg-cyan-500", cells: 3 },
    { name: "Submarine", shipColorClass: "bg-indigo-500", cells: 3 },
    { name: "Patroller", shipColorClass: "bg-rose-500", cells: 2 },
  ],
  setNextShipsToBePlaced: (updatedNextShips) =>
    set(() => ({ nextShipsToBePlaced: updatedNextShips })),
  placementDirection: "row",
  setPlacementDirection: (newDirection) =>
    set(() => ({ placementDirection: newDirection })),
}));

export default useStore;
export { type shipDataType };
