import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  origin: null,
  destination: null,
  travelTimeformation: null,
  basket: [],
  userData:[],
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
    setTravelTimeFormation: (state, action) => {
      state.travelTimeformation = action.payload;
    },
    ADD_TO_USERDATA: (state, action) => {
      return {
        ...state,
        userData: [...state.userData, action.payload]
      };
    },
    ADD_TO_BASKET: (state, action) => {
      const zIndex = state.basket.findIndex(
        basketItem => basketItem.id == action.payload.id
      );
      return {
        ...state,
        basket: [...state.basket, action.payload]
      };
    },
    EMPTY_BASKET: state => {
      return {
        ...state,
        basket: []
      };
    },
    REMOVE_FROM_BASKET: (state, action) => {
      const index = state.basket.findIndex(
        basketItem => basketItem.id === action.payload
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
        basket: newBasket
      };
    }
  }
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeFormation,
  ADD_TO_BASKET,
  EMPTY_BASKET,
  REMOVE_FROM_BASKET,
  ADD_TO_USERDATA
} = navSlice.actions;

export const selectValue = state => state.nav.value;
export const selectOrigin = state => state.nav.origin;
export const selectDestination = state => state.nav.destination;
export const selectTravelTime = state => state.nav.travelTimeformation;
export const selectBasket = state => state.nav.basket;
export const selectUserdata = state => state.nav.userData;

export const getBasketTotal = (basket) =>
  basket?.reduce((price, item) => parseInt(item.price) + price, 0);

export default navSlice.reducer;
