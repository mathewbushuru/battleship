import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import shipReducer from "@/store/ship-slice";
import enemyShipReducer from "@/store/enemy-ship-slice";
import gameplayReducer from "./gameplay-slice";

export const store = configureStore({
  reducer: {
    ship: shipReducer,
    enemyShip: enemyShipReducer,
    gameplay: gameplayReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
