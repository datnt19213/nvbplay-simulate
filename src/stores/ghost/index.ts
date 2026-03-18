import { createSlice } from "@reduxjs/toolkit";

interface GhostState {
  q: string;
}

const initialState: GhostState = {
  q: "",
};

export const ghostSlice = createSlice({
  name: "ghost",
  initialState,
  reducers: {
    setSearchKeyword: (state, { payload }) => {
      state.q = payload;
    },

    resetSearch: () => initialState,
  },
});

export const { setSearchKeyword, resetSearch } = ghostSlice.actions;

export default ghostSlice.reducer;
