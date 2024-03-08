import { combineReducers, Action } from "redux";
import { ThunkAction, configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./tasks/reducers";
import modalReducer from "./modals/reducers";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  modals: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
