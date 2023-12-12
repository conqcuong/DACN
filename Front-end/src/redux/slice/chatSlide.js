import { createSlice  } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState:{
        listChats: [],
        loading: false,
        error: false
    },

    reducers:{
        getAllChatsStart: (state) => {
            state.loading = true;
        },
        getAllChatsSuccess: (state, action) => {
            state.loading = false;
            const newChats = action.payload; // Giả sử payload là một mảng chứa các Chat mới
            // Kiểm tra dữ liệu trùng lặp trước khi cập nhật trạng thái
            newChats.forEach(newChat => {
              const isDuplicate = state.listChats.some(Chat => Chat.id === newChat.id);
              if (!isDuplicate) {
                state.listChats.push(newChat); // Thêm Chat mới vào danh sách nếu không trùng lặp
              }
            });
          },
          getAllChatsFail: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {
    getAllChatsStart, 
    getAllChatsSuccess, 
    getAllChatsFail

} = chatSlice.actions;

export default chatSlice.reducer;