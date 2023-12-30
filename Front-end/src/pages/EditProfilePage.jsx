import React, { useState} from 'react'
import user_img from '../assets/imgs/user/user_img.png'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Sidebar } from '../components/layout/Sidebar'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

export const EditProfilePage = () => {

    const handleFileChange = ({ target: { files } }) => {
        if (files[0]) {
            setFilePath(files[0]);
            //   setFileName(files[0].name);
        setImage(URL.createObjectURL(files[0]));
    }
  };
  const [name, setName] = useState("");
  const user = useSelector((state) => state.auth.login.currentUser);
  const email = user.email;
  const fullname = user.fullname;
//   console.log(name)
  const handleUser = async (e) => {
    try {
        e.preventDefault();
        const editedCourse = {
            // "id": courseId,
            "email": email,
            "password": "12345678Av@",
            "fullname": "Hồ Công Quo"
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(editedCourse));
        if (filePath !== null) {
            formData.append('file', filePath);
        }
        try {
            const response = await axios.put(`http://localhost:9000/Account/Edit/8`, formData);
            return response.data; // Return the response data if needed
        } catch (error) {
            throw error; // Throw the error to handle it in the calling function
        }

        // navigate(`/course/${courseId}`);
    } catch (err) {
        console.log(err);
        
    } finally {
        // setIsLoading(false);
    }
};

// xử lý hình ảnh: kéo thả ảnh hiện hình ảnh, xóa ảnh, hiện thông tin ảnh
const [images, setImage] = useState(null);
const [fileName, setFileName] = useState("Chưa tìm thấy ảnh");
const [filePath, setFilePath] = useState(null);
const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
        setFileName(file.name);
        setImage(URL.createObjectURL(file));
    }
};
const handleDragOver = (e) => {
    e.preventDefault();
};
// console.log(filePath)
  return (
    <>
        <Header/>
        <div class="h-screen overflow-hidden flex items-center justify-center">
            <div className='min-w-[450px] bg-white py-10 px-10 rounded-[16px]'>
                <form className='shadow w-650 p-10' onSubmit={handleUser}>
                    <h4 class="font-bold text-[32px] text-center">Edit Profile</h4>
                    <br />
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Gmail:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[8px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' value={email} type="gmail" onChange={(e)=>setEmail(e.target.value)} disabled/>
                    </div>
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Full Name:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[8px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text" value={fullname} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    {/* <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Role:</label>
                    </div>
                    <div className='flex border border-solid border-gray-300 h-11 overflow-hidden rounded-[8px]'> 
                        <input className='border-none flex-1 px-5 py-3 outline-none' type="text" disabled/>
                    </div> */}
                    <div className='flex justify-between'>
                        <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Hình ảnh:</label>
                    </div>
                    <div className='w-[25%]' onDrop={handleDrop} onDragOver={handleDragOver}>
                                <div className='flex mt-10 h-40 min-w-[300px] img_form' onClick={() => document.querySelector(".input-field").click()}>
                                    <input type="file" accept='image/*' className='input-field' hidden onChange={({ target: { files } }) => {
                                        if (files[0]) {
                                            setFilePath(files[0]);
                                            setFileName(files[0].name);
                                            setImage(URL.createObjectURL(files[0]));
                                        }
                                    }} />
                                    {images ? 
                                        <img src={images} alt="" className='w-full h-full object-cover'/>
                                    : <div className='flex flex-col items-center'>
                                        <img className='w-[100px]' src="https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" alt="" />
                                        kéo hoặc bỏ ảnh vào đây để tải lên
                                      </div>}
                                </div>
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
