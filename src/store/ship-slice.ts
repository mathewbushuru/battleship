import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface currentShipType {
  name: string;
  shipColorClass: string;
  cells: number;
}

interface shipDataType {
  name: string;
  shipColorClass: string;
  numOfCells: number;
  occupiedCells: number[][];
  alreadyPlaced: boolean;
  alreadySunk: boolean;
}

export interface ShipState {
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
}

const initialState: ShipState = {
  currentShip: { name: "Carrier", shipColorClass: "bg-amber-500", cells: 5 },
  shipData: {
    carrier: {
      name: "Carrier",
      shipColorClass: "bg-amber-500",
      numOfCells: 5,
      occupiedCells: [],
      alreadyPlaced: false,
      alreadySunk: false,
    },
    battleship: {
      name: "Battleship",
      shipColorClass: "bg-teal-500",
      numOfCells: 4,
      occupiedCells: [],
      alreadyPlaced: false,
      alreadySunk: false,
    },
    destroyer: {
      name: "Destroyer",
      shipColorClass: "bg-cyan-500",
      numOfCells: 3,
      occupiedCells: [],
      alreadyPlaced: false,
      alreadySunk: false,
    },
    submarine: {
      name: "Submarine",
      shipColorClass: "bg-indigo-500",
      numOfCells: 3,
      occupiedCells: [],
      alreadyPlaced: false,
      alreadySunk: false,
    },
    patroller: {
      name: "Patroller",
      shipColorClass: "bg-rose-500",
      numOfCells: 2,
      occupiedCells: [],
      alreadyPlaced: false,
      alreadySunk: false,
    },
  },
  mouseOverCoords: {
    row: null,
    col: null,
  },
  nextShipsToBePlaced: [
    { name: "Battleship", shipColorClass: "bg-teal-500", cells: 4 },
    { name: "Destroyer", shipColorClass: "bg-cyan-500", cells: 3 },
    { name: "Submarine", shipColorClass: "bg-indigo-500", cells: 3 },
    { name: "Patroller", shipColorClass: "bg-rose-500", cells: 2 },
  ],
  placementDirection: "row",
};

export const shipSlice = createSlice({
  name: "ShipState",
  initialState,
  reducers: {
    setCurrentShipAction: (state, action: PayloadAction<any>) => {
      state.currentShip = action.payload;
    },
    setShipDataAction: (
      state,
      action: PayloadAction<ShipState["shipData"]>,
    ) => {
      state.shipData = action.payload;
    },
    setMouseOverCoordsAction: (
      state,
      action: PayloadAction<ShipState["mouseOverCoords"]>,
    ) => {
      state.mouseOverCoords = action.payload;
    },
    setNextShipsToBePlacedAction: (
      state,
      action: PayloadAction<ShipState["nextShipsToBePlaced"]>,
    ) => {
      state.nextShipsToBePlaced = action.payload;
    },
    setPlacementDirectionAction: (
      state,
      action: PayloadAction<ShipState["placementDirection"]>,
    ) => {
      state.placementDirection = action.payload;
    },
    clearShipsPlacementAction: (state) => {
      state.currentShip = initialState.currentShip;
      state.shipData = initialState.shipData;
      state.nextShipsToBePlaced = initialState.nextShipsToBePlaced;
    },
  },
});

export const {
  setCurrentShipAction,
  setShipDataAction,
  setMouseOverCoordsAction,
  setNextShipsToBePlacedAction,
  setPlacementDirectionAction,
  clearShipsPlacementAction,
} = shipSlice.actions;

const shipSliceReducer = shipSlice.reducer;

export default shipSliceReducer;
