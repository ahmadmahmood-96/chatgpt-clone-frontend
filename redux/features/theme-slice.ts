import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ThemeState;
};

type ThemeState = {
  lightMode: boolean;
};

const initialState = {
  value: {
    lightMode: true,
  } as ThemeState,
} as InitialState;

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value.lightMode = !state.value.lightMode;
    },
  },
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;
