import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../feature/navSlice";
import SellerReducer from "../feature/SellerSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["sellerInfo"],
};

const persistConfig1 = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["navInfo"],
};

const SellerReducers = persistReducer(persistConfig, SellerReducer);
const navReducers = persistReducer(persistConfig1, navReducer);

export const store = configureStore({
  reducer: {
    nav: navReducers,
    seller: SellerReducers,
  },
});

export const persistor = persistStore(store);
