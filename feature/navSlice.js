import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  origin: null,
  destination: null,
  travelTimeformation: null,
  basket: [],
  userData: [],
  userNewAddress: null,
  prescription:null
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setPrescription: (state, action) => {
      state.prescription = action.payload;
    },
    setTravelTimeFormation: (state, action) => {
      state.travelTimeformation = action.payload;
    },
    ADD_NEW_ADDRESS: (state, action) => {
      state.userNewAddress = action.payload;
    },
    ADD_TO_USERDATA: (state, action) => {
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    },
    ADD_TO_BASKET: (state, action) => {
      const zIndex = state.basket.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    },
    EMPTY_BASKET: (state) => {
      return {
        ...state,
        basket: [],
      };
    },
    REMOVE_FROM_BASKET: (state, action) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1); //Cut the same index to the newBasket by one
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload}) as its not in
              basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    },
    INCREASE_ITEM_QUANTITY: (state, action) => {
      let updatedCartList = [...state.basket];
      let index = updatedCartList.findIndex(
        (object) => object.Id === action.Id
      );
      updatedCartList[index].quantity += 1;
      return {
        ...state,
        basket: updatedCartList,
      };
    },
    DECREASE_ITEM_QUANTITY: (state, action) => {
      let updatedCartList = [...state.basket];
      let index = updatedCartList.findIndex(
        (object) => object.productId === action.productId
      );
      let quantity = updatedCartList[index].quantity;
      if (quantity > 1) {
        updatedCartList[index].quantity -= 1;
      }
      return {
        ...state,
        basket: updatedCartList,
      };
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setPrescription,
  setTravelTimeFormation,
  ADD_TO_BASKET,
  EMPTY_BASKET,
  REMOVE_FROM_BASKET,
  ADD_TO_USERDATA,
  ADD_NEW_ADDRESS,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY
} = navSlice.actions;

export const selectValue = (state) => state.nav.value;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectPrescription = (state) => state.nav.prescription;
export const selectTravelTime = (state) => state.nav.travelTimeformation;
export const selectBasket = (state) => state.nav.basket;
export const selectUserdata = (state) => state.nav.userData;

export const getBasketTotal = (basket) =>
  basket?.reduce((price, item) => parseInt(item.price) + price, 0);

export default navSlice.reducer;
