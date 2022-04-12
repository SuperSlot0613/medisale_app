import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  document: "",
  faceImage: "",
  documentImage: "",
  userImage: "",
  sellerdata: null,
  location: [],
};

export const SellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setDocument: (state, action) => {
      state.document = action.payload;
    },
    setFaceImage: (state, action) => {
      state.faceImage = action.payload;
    },
    setDocumentImage: (state, action) => {
      state.documentImage = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    ADD_TO_SELLER: (state, action) => {
      state.sellerdata = action.payload;
    },
    EMPTY_SELLER: (state) => {
      return {
        ...state,
        sellerdata: [],
      };
    },
    ADD_LOCATION: (state, action) => {
      return {
        ...state,
        location: [...state.location, action.payload],
      };
    },
  },
});

export const {
  setDocument,
  setFaceImage,
  ADD_TO_SELLER,
  EMPTY_SELLER,
  ADD_LOCATION,
  setDocumentImage,
  setUserImage,
} = SellerSlice.actions;

export const selectDocument = (state) => state.seller.document;
export const selectFaceImage = (state) => state.seller.faceImage;
export const selectDocumentImage = (state) => state.seller.documentImage;
export const selectUserImage = (state) => state.seller.userImage;
export const selectSellerData = (state) => state.seller.sellerdata;

export default SellerSlice.reducer;
