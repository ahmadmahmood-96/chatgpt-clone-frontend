import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  threadId: string | null; // ✅ add threadId
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  threadId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        threadId: string | null;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.threadId = action.payload.threadId;
      state.isLoggedIn = true;

      // ✅ Save only if window is defined (client side)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        if (action.payload.threadId) {
          localStorage.setItem("threadId", action.payload.threadId);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.threadId = null;
      state.isLoggedIn = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("threadId");
      }
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const storedThreadId = localStorage.getItem("threadId");

        if (storedUser && storedToken) {
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
          state.threadId = storedThreadId;
          state.isLoggedIn = true;
        }
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
