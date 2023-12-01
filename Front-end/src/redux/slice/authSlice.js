import { createSlice  } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        token: [],
        loading: false,
        error: false,
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
        },
        resgiter:{
            isFetching: false,
            success: false,
            error: false,
        },
    },
    reducers:{
        tokenStart: (state) =>{
            state.loading = true;
        },
        tokenSuccess: (state, action) => {
            state.loading = false;
            state.token = action.payload;
        },
          
        tokenFailed: (state) => {
            state.error = true;
            state.token = [];
        },
        
        // Login
        loginStart: (state) =>{
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
        },
          
          loginFailed: (state) => {
            return {
              ...state,
              login: {
                ...state.login,
                isFetching: false,
                currentUser: null // Đặt currentUser về null hoặc xử lý tương ứng khi đăng nhập thất bại
              }
            };
          },
        // Đăng ký
        resgiterStart: (state) =>{
            state.resgiter.isFetching = true;
        },
        resgiterSuccess: (state, action) =>{
            state.resgiter.isFetching = false;
            state.resgiter.success = true;
            state.resgiter.error = false;
        },
        resgiterFailed: (state) =>{
            state.resgiter.isFetching = false;
            state.resgiter.error = true;
            state.resgiter.success = false;
        },
        // Logout
        logoutStart: (state) =>{
            state.login.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.token = []; // Xóa token khi đăng xuất
        },
          
        logoutFailed: (state) => {
            state.login.error = true;
        },
        //Save
        saveStart: (state) =>{
            state.login.isFetching = true;
        },
        saveSuccess: (state, action) => {
            state.login.isFetching = false;
            const newCurrentUser = { ...state.login.currentUser, ...action.payload };
            state.login.currentUser = newCurrentUser;
            return state; // Trả về state mới để cập nhật lại currentUser sau khi cập nhật thông tin
        },
          
        saveFailed: (state) => {
            state.login.error = true;
        },
    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    resgiterStart,
    resgiterFailed,
    resgiterSuccess,
    logoutStart,
    logoutFailed,
    logoutSuccess,
    saveStart,
    saveFailed,
    saveSuccess,
    tokenStart,
    tokenFailed,
    tokenSuccess,
} = authSlice.actions;

export default authSlice.reducer;