import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/User";
import globalSlice from "./features/User";
import themeSlice from "./features/User";
import authSlice from "./features/User";
import appSlice from "./features/User";

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
