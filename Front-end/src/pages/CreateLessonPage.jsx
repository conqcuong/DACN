import React, { useState, useRef} from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import showToast from '../redux/showToast'
import { toast } from 'react-toastify';
import { FaFile, FaCheck } from "react-icons/fa6";
import { createLesson } from '../redux/apiRequest';

export const CreateLessonPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [uploadFile, setUploadFile] = useState(null);
    const fileInputRef = useRef(null); // Sử dụng useRef thay vì useState
    const [creatingCourse, setCreatingCourse] = useState(false);
    const handleFileInputClick = () => {
        fileInputRef.current.click();
    }

    const uploadFiles = (e) => {
        const selectedFile = e.target.files[0];
        setUploadFile(selectedFile);
        console.log(selectedFile);
    }

    const convertFileSize = (sizeInBytes) => {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        const formattedSize = sizeInMB.toFixed(2);
        return formattedSize;
    };

    const course = useSelector((state)=> state.course.listCourses);

    const handLesson = (e) =>{
        try {
            e.preventDefault();
            // if (!course || !course._id) {
            //     toast.error("Course ID not found");
            //     return;
            // }
            const NewLesson = {
                "productId": 9,
                "title": name,
                "description": "This isf a sample sds",
                "deletesoft":1
            };
            const formData = new FormData();
            formData.append('data', JSON.stringify(NewLesson));
            formData.append('file', uploadFile);
            createLesson(formData, dispatch, navigate, showToast)
            // Tiếp tục xử lý với NewLesson
        } catch (error) {
            // toast.error("Create error");
        console.log(error);
        }
    }
    
  return (
    <>
        <Header/>
        <div className='flex min-h-screen mt-5'>
            <div className='hidden shrink-0 lg:block'>
                <Sidebar/>
            </div>
            <div className='ml-[250px] mr-[300px] max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4'>
                <section className='w-full max-w-[1920px] p-0 mx-auto'>
                    <div>
                        <h1 className='text-[28px] font-bold'>Thêm bài học</h1>
                        <form className='flex justify-between gap-10' onSubmit={handLesson}>
                            <div className='w-[80%]'>
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Tên Bài học:</label>
                                </div>
                                <div className='flex border border-solid border-gray-300 h-11 overflow-hidden'>
                                    <input className='border-none flex-1 px-5 py-3 outline-none' type="text" placeholder="Tên khóa học" onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Đường dẫn:</label>
                                </div>
                                <div className='upload-box'>
                                    <div className='form'>
                                        <input className='file-input' type="file" name='file' hidden ref={fileInputRef} onChange={uploadFiles}/>
                                        <div className='icon' onClick={handleFileInputClick}>
                                            <img src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4717174.jpg" alt="" />
                                        </div>
                                        <p>Browse File to upload</p>
                                    </div>
                                    {/* {showProgress && 
                                        <section className='loading-area'>
                                        <li className='row'>
                                            <FaFile />
                                            <div className='content'>
                                                <div className='details'>
                                                    <div className='name'>
                                                        File Name
                                                    </div>
                                                    <div className='percent'>
                                                        40%
                                                    </div>
                                                    <div className='loading-bar'>
                                                        <div className='loading'>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </section>
                                    }       */}
                                    <section className='uploaded-area'>
                                    {uploadFile && (
                                        <li className='row'>
                                            <div className='content upload flex justify-center items-center gap-3'>
                                                <FaFile />
                                                <div className='details flex flex-col gap-1'>
                                                    <span className='name'>{uploadFile.name}</span>
                                                    <span className='size'>{convertFileSize(uploadFile.size)} MB</span>
                                                </div>
                                            </div>
                                        </li>
                                      )}
                                    </section>
                                </div>
                                <button className='mt-5 bg-[#17998c] text-16px rounded-[44px]' type="submit"> 
                                    <div className='px-5 py-3 flex items-center h-full justify-center'>
                                        <span className='font-medium text-white'>Thêm</span>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
        <Footer/>
    </>
  )
}
