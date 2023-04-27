import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/User";
import globalSlice from "./features/GlobalLoading";
import themeSlice from "./features/Theme";
import authSlice from "./features/AuthModal";
import appSlice from "./features/AppState";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeSlice,
    authModal: authSlice,
    globalLoading: globalSlice,
    appState: appSlice,
  },
});

export default store;
