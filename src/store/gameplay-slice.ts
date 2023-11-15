import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GameplayState {
  turn: "player" | "enemy";
}

const initialState: GameplayState = {
  turn: "player",
};

const gameplaySlice = createSlice({
  name: "GameplayState",
  initialState,
  reducers: {
    setTurnAction: (state, action: PayloadAction<GameplayState["turn"]>) => {
      state.turn = action.payload;
    },
    toggleTurnAction: (state) => {
      if (state.turn === "player") {
        state.turn = "enemy";
      } else {
        state.turn = "player";
      }
    },
  },
});

export const { setTurnAction, toggleTurnAction } = gameplaySlice.actions;

const gameplayReducer = gameplaySlice.reducer;

export default gameplayReducer;
