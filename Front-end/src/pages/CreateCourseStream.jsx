import React, { useState, useEffect } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import showToast from '../redux/showToast'
import { FaFile } from "react-icons/fa6";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { createCourse } from '../redux/apiRequest';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

export const CreateCourseStream = () => {
    // Login User
    const user = useSelector((state)=> state.auth.login.currentUser);
    const [selectedDate, setSelectedDate] = useState();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [catelory, setCatelory] = useState(""); 
    const [dateStart, setDateStart] = useState('');
    const [time, setTime] = useState('');

    const handleCourse = async (e) =>{
        try{
            e.preventDefault();
            setIsLoading(true);
            const newCourse = {
                "accountid": user.id,
                "name": name,
                "description": title,
                "price": parseFloat(price),
                "folder": "FolderA",
                "category": 1,
                "date": selectedNumbers, 
                "dateStart": dateStart, 
                "time": time
            };
            const formData = new FormData();
            formData.append('file', filePath);
            formData.append('data', JSON.stringify(newCourse));
            try {
                const response = await fetch('http://localhost:9000/ProductStream/createproduct', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    // Xử lý khi request thành công
                    console.log('Request successful');
                    setIsLoading(false);
                } else {
                    // Xử lý khi có lỗi từ server
                    console.error('Server error:', response.status);
                    setIsLoading(false);
                }
            } catch (error) {
                // Xử lý khi có lỗi trong quá trình gửi request
                console.error('Error sending request:', error);
                setIsLoading(false);
            }
        }catch(err){
            console.log(err);
            toast.error("Tạo khóa học thất bại");
        }
    }
    
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
    // Xử lý khi load để tạo khóa học
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // Khi isLoading thay đổi, thêm hoặc loại bỏ lớp overlay-scroll-lock
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);
    // CheckBox
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayNumberMapping = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7,
    };
    const handleCheckboxChange = (day) => {
        const selectedNumber = dayNumberMapping[day];
        let updatedSelectedNumbers = [...selectedNumbers];
        if (updatedSelectedNumbers.includes(selectedNumber)) {
            updatedSelectedNumbers = updatedSelectedNumbers.filter((number) => number !== selectedNumber);
        } else {
            updatedSelectedNumbers.push(selectedNumber);
        }
        setSelectedNumbers(updatedSelectedNumbers);
    };

    // useEffect(() => {
    //     // Sắp xếp các số theo thứ tự tăng dần
    //     const sortedNumbers = selectedNumbers.sort((a, b) => a - b);
    //     setSelectedNumbers(sortedNumbers);
    // }, [selectedNumbers]);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.format('MM/DD/YYYY');
        const formattedTime = date.format('HH:mm');
        // Đưa ngày vào dateStart và giờ vào time
        setDateStart(formattedDate);
        setTime(formattedTime);
    };

  return (
    <>
        <Header/>
        <div className='flex min-h-screen '>
            <div className='hidden shrink-0 lg:block'>
                <Sidebar/>
            </div>
            <div className='ml-[250px] mr-[150px] max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4 mt-10'>
                <section className='w-full max-w-[1920px] p-0 mx-auto'>
                    <div>
                        <h1 className='text-[28px] font-bold'>Thêm khóa học</h1>
                        <form className='flex justify-between gap-10 ' onSubmit={handleCourse}>
                            <div className='w-[60%]'>
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Tên khóa học:</label>
                                </div>
                                <div className='flex border border-solid border-gray-300 h-11 overflow-hidden'>
                                    <input className='border-none flex-1 px-5 py-3 outline-none' type="text" placeholder="Tên khóa học" onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Mô tả:</label>
                                </div>
                                <div className='flex border border-solid border-gray-300'>
                                    <textarea rows='4' className='border-none flex-1 px-5 py-3 outline-none h-24 w-full' type="text" placeholder="Mô tả" onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Giá:</label>
                                </div>
                                <div className='flex border border-solid border-gray-300 h-11 overflow-hidden'>
                                    <input className='border-none flex-1 px-5 py-3 outline-none' type="text" placeholder="Giá" onChange={(e)=>setPrice(e.target.value)}/>
                                </div> 
                                {/* <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Thể loại:</label>
                                </div> */}
                                <div>
                                    {/* Thể loại */}
                                </div> 
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Các ngày liveStream:</label>
                                </div>
                                <div className='flex gap-7'>
                                    {days.map((day, index) => (
                                        <div key={index} className="flex items-center">
                                            <input type="checkbox" id={day} name={day} checked={selectedNumbers.includes(dayNumberMapping[day])} onChange={() => handleCheckboxChange(day)} className="mr-2"/>
                                            <label htmlFor={day} className="text-sm">{day}</label>
                                        </div>
                                      ))}
                                </div>
                                <div className='flex justify-between'>
                                    <label className='block text-14px font-semibold my-2.5 ml-2 text-black'>Chọn giờ và ngày bắt đầu:</label>
                                </div>
                                <div className="border-2 inline-block">
                                    <Datetime value={selectedDate} onChange={handleDateChange} dateFormat="MM/DD/YYYY" timeFormat="HH:mm" />    
                                </div>
                                <button className='mt-5 bg-[#17998c] text-16px rounded-[44px]' type="submit"> 
                                    <div className='px-5 py-3 flex items-center h-full justify-center'>
                                        <span className='font-medium text-white'>Thêm</span>
                                    </div>
                                </button>
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
                                        {/* <img className='w-[100px]' src="https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" alt="" /> */}
                                        kéo hoặc bỏ ảnh vào đây để tải lên
                                      </div>}
                                </div>
                                <div className='flex mt-5'>
                                    <section className='flex items-center p-2.5 bg-[#d5ebff] w-full gap-3 justify-between rounded-md'>
                                        <FaFile />
                                        <span>{fileName}</span>
                                        <RiDeleteBin7Fill className='hover:cursor-pointer' onClick={() => {
                                            setFileName("Chưa tìm thấy ảnh")
                                            setImage(null);
                                        }}/>
                                    </section>
                                    {/* Thêm các phần tử khác ở đây nếu cần */}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
        <Footer/>
        {isLoading && (
            <div className='overlay'>
                <div className='loader'>
                    <CircularProgress /> {/* Hiển thị CircularProgress */}
                </div>
            </div>
        )}
    </>
  )
}