// countdownSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CountdownState {
  timeLeft: number;
  isRunning: boolean;
}

const initialState: CountdownState = {
  timeLeft: 0,
  isRunning: false,
};

export const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    decrement: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    reset: (state) => {
      state.timeLeft = 0;
      state.isRunning = false;
    },
    start: (state) => {
      state.isRunning = true;
    },
    stop: (state) => {
      state.isRunning = false;
    },
  },
});

export const {setTime, decrement, reset, start, stop} = countdownSlice.actions;
export default countdownSlice.reducer;
