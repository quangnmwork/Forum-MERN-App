import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RepositoryFactory } from "../../api-factory/repositoryFactory";

const userRespository = RepositoryFactory.get("users");

export const login = createAsyncThunk("users/login", async (payload, thunkAPI) => {
  try {
    const res = await userRespository.login(payload);
    console.log(payload);
    const { token } = await res.data;
    localStorage.setItem("token", `Bearer ${token}`);
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});
export const getUserProfile = createAsyncThunk("users/getUserProfile", async payload => {
  try {
    const res = await userRespository.getUserProfile(payload);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isLogin: false,
  },
  reducers: {
    logout: state => {
      localStorage.removeItem("token");
      state.isLogin = false;
    },
  },
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      // console.log(action);
      state.currentUser = action.payload.data || {};
      state.isLogin = true;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.currentUser = {};
      state.isLogin = false;
    },
    [getUserProfile.pending]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      state.isLogin = true;
    },
    [login.rejected]: (state, action) => {
      state.isLogin = false;
    },
  },
});
const { reducer: userReducer } = userSlice;
export const userActions = userSlice.actions;
export default userReducer;
