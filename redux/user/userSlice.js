import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RepositoryFactory } from "../../api-factory/repositoryFactory";

const userRespository = RepositoryFactory.get("users");

export const login = createAsyncThunk("users/login", async (payload, thunkAPI) => {
  try {
    const res = await userRespository.login(payload);
    console.log(payload);
    const { token } = await res.data;
    localStorage.setItem("token", `Bearer ${token}`);
    console.log("already set token");
    return res;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});
export const updatePassword = createAsyncThunk("users/updatePassword", async (payload, thunkAPI) => {
  try {
    const res = await userRespository.updatePassword(payload);
    // console.log(payload);
    const { token } = await res.data;
    localStorage.setItem("token", `Bearer ${token}`);
    return res;
  } catch (err) {
    // console.log(err.response);
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
export const updateProfile = createAsyncThunk("users/updateProfile", async payload => {
  try {
    const res = await userRespository.updateProfile(payload);
    console.log(res.data.data);
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
      state.currentUser = {};
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
    [updatePassword.fulfilled]: (state, action) => {
      state.isLogin = true;
    },
    [updatePassword.rejected]: (state, action) => {
      state.isLogin = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.currentUser = action.payload.user || {};
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLogin = true;
    },
  },
});
const { reducer: userReducer } = userSlice;
export const userActions = userSlice.actions;
export default userReducer;
