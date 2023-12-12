import React, { useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { resgiterUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import showToast from '../../redux/showToast'
import logo from '../../assets/imgs/Logo_9.jpg'
import user_img from '../../assets/imgs/user/user_img.png'

export const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [filePath, setFilePath] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleRegiter = async (e) =>{
        e.preventDefault();
        const newUser = {
            "email" : email,
            "password" : password,
            "fullname" : username,
        };
        const formData = new FormData();
        formData.append('file', filePath);
        formData.append('data', JSON.stringify(newUser));
        try {
            resgiterUser(formData, dispatch, navigate, showToast);
        } catch (error) {
            toast.error('Register failed.');
        }
    }

//   const [fileName, setFileName] = useState('');
  const [image, setImage] = useState('');

  const handleFileChange = ({ target: { files } }) => {
    if (files[0]) {
      setFilePath(files[0]);
    //   setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  console.log(filePath)

  return (
    <>
        <div className='flex items-center p-5 sm:hidden fixed'>
            <Link className='block' to='/'><img className='h-9.5 w-9.5 rounded-lg ' src={logo} alt="" /></Link>
            <p className='font-black ml-3 text-14px'><Link to='/'>Học Lập Trình Để Đi Làm</Link></p>
        </div>
        <div className="h-screen overflow-hidden flex items-center justify-center">
            <div className='min-w-[450px] bg-white py-10 px-10 rounded-[16px]'>
                <h1 className='text-[28px] font-bold text-center'>Register</h1>
                <form className='flex flex-col' onSubmit={handleRegiter}>
                <div className="rounded-full w-15 h-15 mt-3 flex items-center justify-center">
                        <label className="relative w-14 h-14 overflow-hidden flex items-center justify-center bg-gray-300 cursor-pointer rounded-full hover:cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image || user_img})` }}></div>
                        </label>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Gmail:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[44px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="gmail" placeholder="Enter your gmail" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Họ tên:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[44px]'>
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text"  placeholder="Enter your username" onChange={(e)=>setUserName(e.target.value)}/>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Mật khẩu:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[44px]'>
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button className='mt-5 bg-[#17998c] text-16px rounded-[44px]' type="submit"> 
                        <div className='px-5 py-3 flex items-center h-full justify-center'><span className='font-medium text-white'>Đăng ký</span></div>
                    </button>
                </form>
                <p className='text-14px pt-6 px-4 text-base text-center font-medium'>Bạn đã có tài khoản?
                    <Link className='ml-1 font-semibold text-primary-color' to='/login'>Đăng nhập</Link>
                </p>
            </div>
        </div>
    </>
  )
}
