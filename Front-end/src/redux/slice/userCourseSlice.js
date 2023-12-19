import { createSlice  } from "@reduxjs/toolkit";

const userCourse = createSlice({
    name: "userCourse",
    initialState:{
        listPayCourse:[], // Danh sách khóa học User đã mua
        listLesson:[], // Danh sách bài học của khóa học User đã mua
        loading: false,
        error: false,
        success: false
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
        getAllPayLessonStart: (state) => {
            state.loading = true;
        },
        getAllPayLessonSuccess: (state, action) => {
            state.loading = false;
            state.listPayCourse = action.payload;
        },
        getAllPayLessonFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        editPayLessonStart: (state) => {
            state.loading = true;
        },
        editPayLessonSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        editPayLessonFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        
    }
});

export const {
    getAllPayStart,
    getAllPaySuccess,
    getAllPayFail,
    getAllPayLessonStart,
    getAllPayLessonSuccess,
    getAllPayLessonFail,
    editPayLessonStart,
    editPayLessonSuccess,
    editPayLessonFail
} = userCourse.actions;

export default userCourse.reducer;