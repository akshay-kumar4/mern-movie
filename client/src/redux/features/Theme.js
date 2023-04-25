import { createSlice } from "@reduxjs/toolkit";

export const themeModeSlice = createSlice({
  name: "Theme",
  initialState: {
    themeMode: false,
  },
  reducers: {
    setMode: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
