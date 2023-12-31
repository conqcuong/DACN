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
            const newCourses = action.payload; // Giả sử payload là một mảng chứa các khóa học mới
            // Kiểm tra dữ liệu trùng lặp trước khi cập nhật trạng thái
            newCourses.forEach(newCourse => {
              const isDuplicate = state.listCourses.some(course => course.id === newCourse.id); 
              if (!isDuplicate) {
                state.listCourses.push(newCourse); // Thêm khóa học mới vào danh sách nếu không trùng lặp
              }
            });
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
        },
        getOneStart: (state) => {
            state.loading = true;
        },
        getOneSuccess: (state, action) => {
            state.loading = false;
            state.currentCourse = action.payload;
        },
        getOneFail: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})

export const { 
    getAllCoursesStart, 
    getAllCoursesSuccess, 
    getAllCoursesFail,
    createCourseStart,
    createCourseSuccess,
    createCourseFail,
    getOneStart,
    getOneSuccess,
    getOneFail
} = courseSlice.actions;

export default courseSlice.reducer;