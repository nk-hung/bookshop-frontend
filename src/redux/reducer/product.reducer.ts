import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { LOADING } from "../../shared/constants/loading";
import { Status } from "../../shared/enums/status";
import { RootState } from "../store";

const initialState = {
  loading: false,
  data: [],
};

export const getProductsAsync = createAsyncThunk("products", async () => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:5000/books",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.data;
  return data;
});

export const getProductDatailAsync = createAsyncThunk(
  "product/detail",
  async (id: any) => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:5000/books/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("detail:", res);
    return await res.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = LOADING.TRUE;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = LOADING.FALSE;
      });
  },
});

// export const selectorProducts = (state: RootState) => state.product.data;

export default productSlice.reducer;
