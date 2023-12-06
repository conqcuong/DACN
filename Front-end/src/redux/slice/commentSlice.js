import { createSlice  } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState:{
        listComments: [],
        loading: false,
        error: false
    },

    reducers:{
        getAllCmtsStart: (state) => {
            state.loading = true;
        },
        getAllCmtsSuccess: (state, action) => {
            state.loading = false;
            const newComments = action.payload; // Giả sử payload là một mảng chứa các Comment mới
            // Kiểm tra dữ liệu trùng lặp trước khi cập nhật trạng thái
            newComments.forEach(newComment => {
              const isDuplicate = state.listComments.some(Comment => Comment.id === newComment.id);
              if (!isDuplicate) {
                state.listComments.push(newComment); // Thêm Comment mới vào danh sách nếu không trùng lặp
              }
            });
          },
          getAllCmtsFail: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {
    getAllCmtsStart, 
    getAllCmtsSuccess, 
    getAllCmtsFail

} = commentSlice.actions;

export default commentSlice.reducer;