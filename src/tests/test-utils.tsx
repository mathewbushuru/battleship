import React, { PropsWithChildren } from "react";
import {
  render as originalRender,
  type RenderOptions,
} from "@testing-library/react";
import { configureStore, type PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { type RootState, type AppStore } from "@/store/store";
import shipReducer from "@/store/ship-slice";

// type interface that extends default options of Render from RTL
// and allow others ie initialState, store
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function render(
  ui: React.ReactElement,
  {
    // automatically create store instance if no store was passed in
    store = configureStore({ reducer: { ship: shipReducer } }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...originalRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
