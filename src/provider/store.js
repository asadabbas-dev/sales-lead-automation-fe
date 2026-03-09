import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/auth.slice";
import runsReducer from "./features/runs/runs.slice";
import leadsReducer from "./features/leads/leads.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "runs", "leads"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  runs: runsReducer,
  leads: leadsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
