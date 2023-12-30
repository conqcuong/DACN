import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slice/authSlice'
import courseReducer from './slice/courseSlice'
import lessonSlice from "./slice/lessonSlice";
import userSlice from "./slice/userSlice";
import commentSlice from "./slice/commentSlice";
import chat from "./slice/commentSlice"
import userCourseSlice from "./slice/userCourseSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // 'course' 'userCourse' 'lesson' 'user','lesson'
    blacklist: [ 'comment', 'userCourse', 'course', 'userCourse', 'lesson']
    // whitelist: ['key1', 'key2'],
}

const rootReducer = combineReducers({auth: authReducer, course: courseReducer, lesson: lessonSlice, user: userSlice, comment: commentSlice, userCourse:userCourseSlice})  

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export let persistor = persistStore(store)
