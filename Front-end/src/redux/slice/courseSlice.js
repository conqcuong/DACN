import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        loading: false,
        error: false,
        listCourses: [],
        success: false,
        currentCourse: null,
    },
    reducers: {
        getAllCoursesStart: (state) => {
            state.loading = true;
        },
        getAllCoursesSuccess: (state, action) => {
            state.loading = false;
            state.listCourses = action.payload;
        },
        getAllCoursesFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        createCourseStart: (state) => {
            state.loading = true;
        },
        createCourseSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        createCourseFail: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
})

export const { 
    getAllCoursesStart, 
    getAllCoursesSuccess, 
    getAllCoursesFail,
    createCourseStart,
    createCourseSuccess,
    createCourseFail
} = courseSlice.actions;

export default courseSlice.reducer;