import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModalState {
  open: boolean;
  type: "login" | "register" | null;
}

const initialState: AuthModalState = {
  open: false,
  type: null,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<"login" | "register">) => {
      state.open = true;
      state.type = action.payload;
    },
    closeAuthModal: (state) => {
      state.open = false;
      state.type = null;
    },
  },
});

export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
export default authModalSlice.reducer;
