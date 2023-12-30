import React, { useRef, useState, useEffect } from "react";
// import { AnswerTimes } from "../components/quiz/AnswerTimes";
import logo from "../assets/imgs/f8-icon.png";
import { FaChevronLeft, FaChevronRight, FaBars, FaArrowRight, FaComments, FaXmark } from 'react-icons/fa6'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Comment } from "../components/layout/Comment";
import { format } from 'date-fns';
import ReactPlayer from 'react-player';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const TestLive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        accountid: 1, // Thay đổi userId theo nhu cầu
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(postData);

            const response = await axios.post('http://localhost:9008/createStream', postData);
            if (response.data) {

                console.log('Data from server:', response.data);

                setPostData(response.data);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Thay thế URL bằng URL thực tế của API bạn muốn lấy dữ liệu
                const response = await axios.get('http://localhost:9008/get-key');
                setData(response.data)

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const [isSplit, setIsSplit] = useState(false);
    const toggleSplit = () => {
        setIsSplit(!isSplit);
    };
    const [openCmt, setOpenCmt] = useState(false);
    const menuCmt = useRef();
    const CmtRef = useRef();
    const isClickInside = useRef(false);

    const closeCmt = () => {
        setOpenCmt(false);
        document.body.style.overflow = "auto";
    };

    const handleWindowClick = (e) => {
        if (!isClickInside.current && menuCmt.current && CmtRef.current) {
            closeCmt();
        }
        isClickInside.current = false;
    };

    const handleCmtClick = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện "click" trên phần nội dung lan toả ra bên ngoài
        // isClickInside.current = true;
    };

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);
            return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    const closeCmtOnClick = () => {
        closeCmt();
    };
  return (
    <>
        <section className="page-container">
            <div className='flex items-center bg-[#29303b] relative z-1 h-[50px]'>
                <div className='flex cursor-pointer h-[50px] w-[60px] transition-background-color duration-200 ease-linear'><Link to='/'><FaChevronLeft className='mx-[25px] my-[17px] text-white'/></Link></div>
                <Link className='ml-2 relative sm:hidden' to='/'><img className='h-[30px] rounded-lg' src={logo}/></Link>
                <div className='text-14px font-bold text-white ml-4 sm:ml-0'>Giới thiệu</div>
            </div>
            <div className={`bottom-[50px] left-0 mt-[50px] overflow-y-hidden fixed top-0 ${isSplit ? 'lg:w-[77%] lg:pr-2 w-full '  : 'w-[100%]'} transition-width duration-200 ease-linear`}>
                <div className={`relative w-full bg-black ${isSplit ? 'px-[8.5%] sm:px-0' : 'lg:px-[16%] md:px-[8.5%]'} transition-width duration-200 ease-linear`}>
                    <div className='pt-[56.25%] relative'>
                        <div className='w-full h-full absolute inset-0 overflow-hidden'>
                            {/* Sử dụng key={getLesson.id} để tránh load trang 2 lần  */}
                            <ReactPlayer
                    url={`http://localhost:8080/hls/${data}.m3u8`}
                    controls={true}
                    playing={isPlaying}
                    width="40%"
                    height="auto"
                />
                        </div>
                    </div>
                </div>
                <div className={`min-h-[400px] sm:px-4 sm:mt-5 ${isSplit ? 'px-[8.5%]' : 'lg:px-[16%] md:px-[8.5%]'} transition-width duration-200 ease-linear`}>
                    <h1 className='text-[28px] mt-8 mb-2 font-semibold sm:mt-0 sm:line-clamp-2'>test</h1>
                    <p className='text-13px mt-3 '>Cập nhật 24</p>
                </div>
            </div>
            <div className='flex items-center lg:justify-center z-2 bg-[#f0f0f0] lg:h-[50px] bottom-0 shadow-[rgba(0,0,0,.1)] left-0 fixed right-0 h-[60px] justify-end'>
                <button className='flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center md:mr-4 md:p-2.5'>
                    <FaChevronLeft/>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2'>BÀI TRƯỚC</span>
                </button>
                <button  className='flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center ml-3 md:mr-4 md:p-2.5'>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2' >BÀI TIẾP THEO</span>
                    <FaChevronRight/>
                </button>
            </div>
            <div className='bottom-[70px] fixed right-5 z-1'>
                <button className='action_Button flex items-center}' onClick={() => {
                    setOpenCmt(!openCmt); 
                    isClickInside.current = true;
                    document.body.style.overflow = "hidden";
                } }>
                    <FaComments className='text-[20px]'/>
                    <span className='ml-2 text-16px'>Hỏi đáp</span>
                </button>
            </div>
            {openCmt && (
                <div className="cmt_wrapper" ref={menuCmt}>
                    <div className="cmt_container" ref={CmtRef} onClick={handleCmtClick}>
                        <div className='close_btn hover:cursor-pointer hover:text-text-color ' onClick={closeCmtOnClick}>
                            <FaXmark/>
                        </div>
                        <Comment/>
                    </div>
                </div>
            )}
        </section>
    </>
  )
}
