import { createSlice  } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        listUsers: [],
        loading: false,
        error: false
    },

    reducers:{
        getAllUsersStart: (state) => {
            state.loading = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.loading = false;
            const newUsers = action.payload; // Giả sử payload là một mảng chứa các User mới
            // Kiểm tra dữ liệu trùng lặp trước khi cập nhật trạng thái
            newUsers.forEach(newUser => {
              const isDuplicate = state.listUsers.some(user => user.id === newUser.id);
              if (!isDuplicate) {
                state.listUsers.push(newUser); // Thêm user mới vào danh sách nếu không trùng lặp
              }
            });
          },
        getAllUsersFail: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {
    getAllUsersStart, 
    getAllUsersSuccess, 
    getAllUsersFail

} = userSlice.actions;

export default userSlice.reducer;