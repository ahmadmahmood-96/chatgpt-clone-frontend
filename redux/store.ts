import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme-slice";
import chatModalReducer from "./features/chatbot-slice";
import authModalReducer from "./features/authmodal-slice";
import sidebarReducer from "./features/sidebar-slice";
import authReducer, { loadUserFromStorage } from "./features/auth-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    themeReducer,
    chatModalReducer,
    authModalReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
  },
});
store.dispatch(loadUserFromStorage());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
