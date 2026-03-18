import { CollectionProduct } from "@/services/collections/type";
import { createSlice } from "@reduxjs/toolkit";

interface CollectionsState {
  collections: CollectionProduct[];
}

const initialState: CollectionsState = {
  collections: [],
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState: initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
  },
});

export const { setCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;
