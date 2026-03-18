import { BlogDetail } from "@/services/blog/type";
import { createSlice } from "@reduxjs/toolkit";

interface BlogState {
  currentBlog: BlogDetail | null;
  triggerRefetch: boolean;
}

const initialState: BlogState = {
  currentBlog: null,
  triggerRefetch: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
    setTriggerRefetchFromDetail: (state, action) => {
      state.triggerRefetch = action.payload;
    },
  },
});

export const { setCurrentBlog, setTriggerRefetchFromDetail } =
  blogSlice.actions;

export default blogSlice.reducer;
