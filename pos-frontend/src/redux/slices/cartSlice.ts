import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, { payload }) => {
      const existingItem = state.find((item) => item.id === payload.id);
      if (existingItem) {
        // Update the quantity to the new one from payload (override or adjust as needed)
        existingItem.quantity += payload.quantity;
        // Optionally update other fields, e.g., price:
        // existingItem.price = payload.price;
      } else {
        // Add the new item to the cart
        state.push(payload);
      }
    },

    removeItem: (state, action) => {
      return state.filter((item) => item.id != action.payload);
    },

    removeAllItems: (state) => {
      return [];
    },
  },
});

export const getTotalPrice = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
export const { addItems, removeItem, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
