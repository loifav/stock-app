"use client";

import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "@/reduxslice/categorySlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});
