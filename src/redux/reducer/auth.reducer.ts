import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import jwtDecode from "jwt-decode";
import { act } from "react-dom/test-utils";
import { Status } from "../../shared/enums/status";
import { Login } from "../../shared/interfaces/login";
import { RootState } from "../store";

export const loginAsync = createAsyncThunk("login", async (body: Login) => {
  // const res = await axios({
  //   method: "POST",
  //   url: "http://localhost:5000/auth/signin",
  //   data: body,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const res = await axios.post("http://localhost:5000/auth/signin", {
  //   data: body,
  // });
  const res = await fetch("http://localhost:5000/auth/signin", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("before!!!", res);

  const data = await res.json();
  return data;
});

export const getUserInfoAsync = createAsyncThunk(
  "getInfo",
  async (token: string) => {
    const { sub }: any = jwtDecode(token);
    const res = await axios({
      method: "GET",
      url: `http://localhost:5000/users/${sub}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }
);

const initialState = {
  token: "",
  info: null,
  status: Status.Idle,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.token = "";
      state.info = null;
      state.status = Status.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = Status.Idle;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
          state.status = Status.Success;
          state.token = action.payload.token;
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = Status.Failed;
      })
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = Status.Idle;
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.info = action.payload.data;
        state.status = Status.Success;
        console.log("action payload:", action.payload);
      })
      .addCase(getUserInfoAsync.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.status = Status.Failed;
        console.log("payload:", action.payload);
      });
  },
});

export const { logoutAction } = authSlice.actions;

export const selectorUser = (state: RootState) => state.auth.info;

export const selectorAuth = (state: RootState) => state.auth.token;

export default authSlice.reducer;
