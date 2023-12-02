import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        loading: false,
        error: false,
        listLessons: [],
        success: false,
        currentLesson: null,
    },
    reducers: {
        getAllLessonsStart: (state) => {
            state.loading = true;
        },
        getAllLessonsSuccess: (state, action) => {
            state.loading = false;
            const newLessons = action.payload; // Giả sử payload là một mảng chứa các bài học mới
            // Kiểm tra dữ liệu trùng lặp trước khi cập nhật trạng thái
            newLessons.forEach(newLesson => {
              const isDuplicate = state.listLessons.some(lesson => lesson.id === newLesson.id); // Điều chỉnh logic so sánh của bạn ở đây
              if (!isDuplicate) {
                state.listLessons.push(newLesson); // Thêm bài học mới vào danh sách nếu không trùng lặp
              }
            });
        },
        getAllLessonsFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        createLessonStart: (state) => {
            state.loading = true;
        },
        createLessonSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        createLessonFail: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
})

export const { 
    getAllLessonsStart, 
    getAllLessonsSuccess, 
    getAllLessonsFail,
    createLessonStart,
    createLessonSuccess,
    createLessonFail
} = lessonSlice.actions;

export default lessonSlice.reducer;