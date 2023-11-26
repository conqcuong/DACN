import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import logo from '../../assets/imgs/f8-icon.png'
import { toast } from "react-toastify";
import showToast from '../../redux/showToast'
import { useSelector } from "react-redux";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const newUser = {
          username: username,
          password: password,
        };
        try {
            // , navigate
            await loginUser(newUser, dispatch, showToast);
        } catch (error) {
          toast.error('Login failed.');
        }
    };
    const user = useSelector((state)=> state.auth.login.currentUser);
    if (user) {
        window.parent.postMessage('loginSuccess', '*');
    }
    
  return (
    <>
        <div className="h-screen overflow-hidden flex items-center justify-center">
            <div className='min-w-[450px] bg-white py-10 px-10 rounded-[16px]'>
                <h1 className='text-[28px] font-bold text-center'>Login</h1>
                <form className='flex flex-col' onSubmit={handleLogin}>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Tài khoản:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[44px]'>
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Mật khẩu:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[44px]'>
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='mt-5 bg-[#17998c] text-16px rounded-[44px]' type="submit"> 
                        <div className='px-5 py-3 flex items-center h-full justify-center'><span className='font-medium text-white'>Đăng nhập</span></div>
                    </button>
                </form>
                <p className='text-14px pt-6 px-4 text-base text-center font-medium'>Bạn chưa có tài khoản?
                    <Link className='ml-1 font-semibold text-primary-color' to='/register'>Đăng ký</Link>
                </p>
            </div>
        </div>
    </>
  )
}
