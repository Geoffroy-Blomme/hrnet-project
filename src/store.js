// import { configureStore } from "@reduxjs/toolkit";
// export default configureStore({
//   reducer: {
//     EmployeeList: EmployeeListSlice,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import EmployeeListSlice from "./features/EmployeeList";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  employee: EmployeeListSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//localStorage.removeItem("persist:root");
export const persistor = persistStore(store);
