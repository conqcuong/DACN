import { createSlice  } from "@reduxjs/toolkit";

const userCourse = createSlice({
    name: "userCourse",
    initialState:{
        listPayCourse:[], // Danh sách khóa học User đã mua
        loading: false,
        error: false,
    },
    reducers:{
        getAllPayStart: (state) => {
            state.loading = true;
        },
        getAllPaySuccess: (state, action) => {
            state.loading = false;
            state.listPayCourse = action.payload;
        },
        getAllPayFail: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {
    getAllPayStart,
    getAllPaySuccess,
    getAllPayFail
} = userCourse.actions;

export default userCourse.reducer;