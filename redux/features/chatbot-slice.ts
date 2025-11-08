import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ChatModalState;
};

type ChatModalState = {
  open: boolean;
};

const initialState = {
  value: {
    open: false,
  } as ChatModalState,
} as InitialState;

export const chatModal = createSlice({
  name: "chatModal",
  initialState,
  reducers: {
    toggleChatModal: (state) => {
      state.value.open = !state.value.open;
    },
  },
});

export const { toggleChatModal } = chatModal.actions;
export default chatModal.reducer;
