import React, { useState} from 'react'
import user_img from '../assets/imgs/user/user_img.png'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Sidebar } from '../components/layout/Sidebar'

export const EditProfilePage = () => {
    const [image, setImage] = useState('');

    const handleFileChange = ({ target: { files } }) => {
        if (files[0]) {
            setFilePath(files[0]);
            //   setFileName(files[0].name);
        setImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <>
        <Header/>
        <div class="h-screen overflow-hidden flex items-center justify-center">
            <div className='min-w-[450px] bg-white py-10 px-10 rounded-[16px]'>
                <form className='shadow w-650 p-10'>
                    <h4 class="font-bold text-[32px] text-center">Edit Profile</h4>
                    <br />
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Gmail:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[8px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="gmail" onChange={(e)=>setEmail(e.target.value)} disabled/>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Full Name:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[8px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text"/>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Role:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[8px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text" disabled/>
                    </div>
                    <div className="rounded-full w-15 h-15 mt-3 flex items-center justify-center">
                        <label className="relative w-14 h-14 overflow-hidden flex items-center justify-center bg-gray-300 cursor-pointer rounded-full hover:cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image || user_img})` }}></div>
                        </label>
                    </div>
                    <button className='mt-5 bg-[#17998c] text-16px rounded-[8px]' type="submit"> 
                        <div className='px-5 py-3 flex items-center h-full justify-center'><span className='font-medium text-white'>Chỉnh sửa</span></div>
                    </button>
                </form>
            </div>
        </div>
        <Footer/>
    </>
  )
}
