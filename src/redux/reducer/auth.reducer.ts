import {
  $CombinedState,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
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
  });
  console.log("before!!!", res);

  // const data = await res.data.json();
  // return data;
});

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
    builder.addCase(loginAsync.pending, (state) => {
      state.status = Status.Idle;
    });
    // .addCase(loginAsync.fulfilled, (state, action) => {
    //   if (action.payload.status === "success") {
    //     state.status = Status.Success;
    //     state.token = action.payload.auth.token;
    //   }
    // })
    // .addCase(loginAsync.rejected, (state, action) => {
    //   // Tắt trạng thái loading, lưu thông báo lỗi vào store
    //   // state.error = action.payload.message;
    //   console.log("payload:", action.payload);
    // });
  },
});

export const { logoutAction } = authSlice.actions;

export const selectorUser = (state: RootState) => state.auth.info;

export const selectorAuth = (state: RootState) => state.auth.token;

export default authSlice.reducer;
