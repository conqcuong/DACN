import axios from "axios";
import { logoutStart,logoutFailed,logoutSuccess,loginFailed, loginStart, loginSuccess, resgiterStart, resgiterSuccess, resgiterFailed, saveStart,
    saveFailed,
    saveSuccess } from "./slice/authSlice";

// authSlice
// , navigate
// navigate("/")
export const loginUser = async(user, dispatch, showToast) =>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:8000/v1/auth/login", user)
        dispatch(loginSuccess(res.data));
        showToast('Login successful.', 'success');
    }catch(err){
        dispatch(loginFailed());
        showToast('Incorrect username or password!', 'error');
    }
};

export const resgiterUser = async (user, dispatch, navigate, showToast) =>{
    dispatch(resgiterStart());
    try{
        await axios.post("http://localhost:8000/v1/auth/register", user);
        dispatch(resgiterSuccess());
        navigate("/login");
        showToast('Resgiter successful.', 'success');
        window.location.reload();
    }catch(err){
        dispatch(resgiterFailed());
        showToast('Duplicate gmail account!', 'error');
    }
};

export const logOutUser = async(dispatch) =>{
    dispatch(logoutStart());
    try{
        // const res = await axios.post("http://localhost:8000/v1/auth/logout", user)
        dispatch(logoutSuccess());
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