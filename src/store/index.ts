import { AnyAction, configureStore } from "@reduxjs/toolkit"
import { Reducer } from "react"
import { useDispatch } from "react-redux"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import Storage from "redux-persist/lib/storage"

import rootReducer from "./rootReducer"

const persistConfig = {
  key: "eec-client-web",
  storage: Storage,
  whitelist: ["user", "partyRoom"],
}

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as Reducer<unknown, AnyAction>
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
