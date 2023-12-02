import axios from "axios";
import { logoutStart,logoutFailed,logoutSuccess,loginFailed, loginStart, loginSuccess, resgiterStart, 
        resgiterSuccess, resgiterFailed, saveStart,saveFailed,saveSuccess,tokenStart,
        tokenFailed,tokenSuccess } from "./slice/authSlice";

import {getAllCoursesStart, 
        getAllCoursesSuccess, 
        getAllCoursesFail,
        createCourseStart,
        createCourseSuccess,
        createCourseFail} from "./slice/courseSlice"

import {getAllLessonsStart, 
        getAllLessonsSuccess, 
        getAllLessonsFail,
        createLessonStart,
        createLessonSuccess,
        createLessonFail} from "./slice/lessonSlice"
// authSlice

export const loginUser = async(user, dispatch, showToast, navigate) =>{
    dispatch(tokenStart());
    try{
        const res = await axios.post("http://localhost:9006/Account/authenticate", user)
        dispatch(tokenSuccess(res.data));
        showToast('token successful.', 'success');
        navigate("/")
    }catch(err){
        dispatch(tokenFailed());
        showToast('Incorrect username or password!', 'error');
    }
};

export const profileUser = async (token, dispatch) => {
    dispatch(loginStart()); // Dispatch action bắt đầu đăng nhập
    try {
        const res = await axios.get('http://localhost:9000/Account/login', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        // Nếu request thành công, dispatch action với thông tin người dùng vào Redux
        dispatch(loginSuccess(res.data)); // Thay loginSuccess bằng action tương ứng trong ứng dụng của bạn
    } catch (error) {
        // Xử lý lỗi nếu có
        dispatch(loginSuccess(error)); // Thay loginFailure bằng action tương ứng trong ứng dụng của bạn
    }
};
export const resgiterUser = async (user, dispatch, navigate, showToast) =>{
    dispatch(resgiterStart());
    try{
        await axios.post("http://localhost:9000/Account/Create", user);
        dispatch(resgiterSuccess());
        navigate("/login");
        showToast('Resgiter successful.', 'success');
        window.location.reload();
    }catch(err){
        dispatch(resgiterFailed());
        showToast('Duplicate gmail account!', 'error');
    }
};

export const logOutUser = async(dispatch, navigate) =>{
    dispatch(logoutStart());
    try{
        // const res = await axios.post("http://localhost:8000/v1/auth/logout", user)
        dispatch(logoutSuccess());
        navigate("/login");
    }catch(err){
        dispatch(logoutFailed());
    }
};

export const saveOutUser = async(dispatch, user) =>{
    dispatch(saveStart());
    try{
        // const res = await axios.post("http://localhost:8000/v1/auth/save", user)
        dispatch(saveSuccess(user));
    }catch(err){
        dispatch(saveFailed());
    }
};

// COURSE

export const getAllCourses = async (dispatch) => {
    dispatch(getAllCoursesStart());
    try {
        const res = await axios.get("http://localhost:8889/product/getall");
        dispatch(getAllCoursesSuccess(res.data));
    } catch (err) {
        dispatch(getAllCoursesFail());
    }
}

export const createCourse = async (formData, dispatch, navigate, showToast) => {
    dispatch(createCourseStart());
    try {
        const response = await fetch('http://localhost:9000/product/createproduct', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(createCourseSuccess(data));
        showToast('Create successful.', 'success');
        navigate("/library");
    } catch (error) {
        dispatch(createCourseFail());
        showToast('Create error', 'error');
    }
}

// LESSON
export const getAllLessons = async (dispatch) => {
    dispatch(getAllLessonsStart());
    try {
        const res = await axios.get("http://localhost:9000/Lession/getall");
        dispatch(getAllLessonsSuccess(res.data));
    } catch (err) {
        dispatch(getAllLessonsFail());
    }
}

export const createLesson = async (formData, dispatch, navigate, showToast) => {
    dispatch(createLessonStart());
    try {
        const response = await fetch('http://localhost:9000/Lession/Create', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(createLessonSuccess(data));
        showToast('Create successful.', 'success');
        navigate("/library");
    } catch (error) {
        dispatch(createLessonFail());
        showToast('Create error', 'error');
        console.log(error);
    }
}