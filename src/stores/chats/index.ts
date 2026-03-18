import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "./type";
interface ChatState {
  listChat: Chat[] | null;
  activeChat: string | null;
  expanded: boolean;
}

const initialState: ChatState = {
  listChat: null,
  activeChat: null,
  expanded: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setListChat: (state, action) => {
      state.listChat = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setExpanded: (state, action) => {
      state.expanded = action.payload;
    },
  },
});

export const { setListChat, setActiveChat, setExpanded } = chatSlice.actions;

export default chatSlice.reducer;
