import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface shipDataType {
  name: string;
  shipColorClass: string;
  numOfCells: number;
  occupiedCells: number[][];
  hitCells: number[][];
  alreadySunk: boolean;
}

export interface ShipState {
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
  missedHitCells: number[][];
}

const initialState: ShipState = {
  shipData: {
    carrier: {
      name: "Carrier",
      shipColorClass: "bg-amber-500",
      numOfCells: 5,
      occupiedCells: [],
      hitCells: [],
      alreadySunk: false,
    },
    battleship: {
      name: "Battleship",
      shipColorClass: "bg-teal-500",
      numOfCells: 4,
      occupiedCells: [],
      hitCells: [],
      alreadySunk: false,
    },
    destroyer: {
      name: "Destroyer",
      shipColorClass: "bg-cyan-500",
      numOfCells: 3,
      occupiedCells: [],
      hitCells: [],
      alreadySunk: false,
    },
    submarine: {
      name: "Submarine",
      shipColorClass: "bg-indigo-500",
      numOfCells: 3,
      occupiedCells: [],
      hitCells: [],
      alreadySunk: false,
    },
    patroller: {
      name: "Patroller",
      shipColorClass: "bg-rose-500",
      numOfCells: 2,
      occupiedCells: [],
      hitCells: [],
      alreadySunk: false,
    },
  },
  mouseOverCoords: {
    row: null,
    col: null,
  },
  missedHitCells: [],
};

export const enemyShipSlice = createSlice({
  name: "EnemyShipState",
  initialState,
  reducers: {
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
    addMissedHitCellAction: (state, action: PayloadAction<number[]>) => {
      state.missedHitCells.push(action.payload);
    },
  },
});

export const {
  setShipDataAction,
  setMouseOverCoordsAction,
  addMissedHitCellAction,
} = enemyShipSlice.actions;

const enemyShipReducer = enemyShipSlice.reducer;

export default enemyShipReducer;
