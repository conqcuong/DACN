import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginUser, profileUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import logo from '../../assets/imgs/Logo_9.jpg'
import { toast } from "react-toastify";
import showToast from '../../redux/showToast'
import { useSelector } from "react-redux";

export const Login = () => {
    const token = useSelector(state => state.auth.token);
    // console.log(token)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
        };
    
        try {
            await loginUser(newUser, dispatch, showToast, navigate);
        } catch (error) {
            toast.error(error.message); // Xử lý lỗi khi đăng nhập
        }
    };
    
    // const user = useSelector((state)=> state.auth.login.currentUser);
    //     if (!user) {
    //         console.log("Chưa đăng nhập")
    //     }else{
    //         window.parent.postMessage({ type: 'loginSuccess', data: user }, '*');
    //     }
  return (
    <>
        <div className='flex items-center p-5 sm:hidden fixed'>
            <Link className='block' to='/'><img className='h-9.5 w-9.5 rounded-lg ' src={logo} alt="" /></Link>
            <p className='font-black ml-3 text-14px'><Link to='/'>Học Lập Trình Để Đi Làm</Link></p>
        </div>
        <div className="h-screen overflow-hidden flex items-center justify-center">
            <div className='min-w-[450px] bg-white py-10 px-10 rounded-[16px]'>
                <h1 className='text-[28px] font-bold text-center'>Login</h1>
                <form className='flex flex-col' onSubmit={handleLogin}>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Email:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[44px]'>
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)}/>
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
