// src/redux/features/sidebar-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean; // for Drawer mode
  collapsed: boolean; // for Sider mode (desktop)
}

const initialState: SidebarState = {
  isOpen: false,
  collapsed: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        state.isOpen = !state.isOpen; // Mobile Drawer
      } else {
        state.collapsed = !state.collapsed; // Desktop Sider
      }
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar, setCollapsed } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
