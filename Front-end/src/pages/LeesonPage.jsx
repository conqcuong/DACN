import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/imgs/Logo_9.jpg";
import { FaChevronLeft, FaChevronRight, FaBars, FaArrowRight, FaComments, FaXmark } from 'react-icons/fa6'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { Comment } from "../components/layout/Comment";
import { format } from 'date-fns';

export const LeesonPage = () => {
    const { id } = useParams();
    const navigateTo = useNavigate();
    // ép kiểu về int
    const lessonId = parseInt(id);
    const course = useSelector((state)=> state.course.listCourses); 
    const lesson = useSelector((state)=> state.lesson.listLessons);
    // lấy bài học có cùng id
    const getLesson = lesson.find(u => u.id === lessonId);
    const getcourseFind = course.find(g => g.id ===  getLesson.productId)
    // Lấy danh sách bài học
    const lessonsForCourse = lesson.filter(lesson => lesson.productId === getcourseFind.id); 
    // Kiểm xoát xem video
    const videoRef = useRef(null);
    const [timer, setTimer] = useState(0); //  Thời gian đã xem
    const [totalTime, setTotalTime] = useState(0); // Tổng thời gian xem
    const [thirtyPercentTime, setThirtyPercentTime] = useState(0); // 30% Tổng video
    const [isActive, setIsActive] = useState(false);
    const [seekCount, setSeekCount] = useState(0); // Số lần tua video
    const [allowNext, setAllowNext] = useState(false); //Điều kiện hiện nút cho người dùng ấn
    /**/
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
    //
    const updatedAtString = getLesson.date; // Chuỗi ngày từ getLesson
    const updatedAtDate = new Date(updatedAtString); // Chuyển đổi thành đối tượng Date
    const formattedUpdatedAt = format(updatedAtDate, "MMMM 'năm' yyyy"); // Định dạng ngày
    console.log(formattedUpdatedAt)
    //

    // Xem video
    useEffect(() => {
        const interval = setInterval(() => {
            if (isActive) {
                setTimer((prevTimer) => prevTimer + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    const handleVideoPlay = () => {
        setIsActive(true);
    };

    const handleVideoPause = () => {
        setIsActive(false);
    };

    const handleVideoSeeked = () => {
        const video = videoRef.current;
        if (video.currentTime === 0) {
            setTimer(0);
        }

        // Tăng số lần tua video
        setSeekCount((prevCount) => prevCount + 1);

        // Kiểm tra nếu tua video quá 50%
        // const percentSeeked = (video.currentTime / video.duration) * 100;
        // if (percentSeeked > 50) {
        //     alert('Cảnh báo: Bạn đã tua quá 50% của video.');
        // }
    };
    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (video) {
            const duration = video.duration;
            setTotalTime(duration);
            const thirtyPercent = duration * 0.1; // Tính toán 30% của thời gian tổng
            setThirtyPercentTime(thirtyPercent); // Lưu giá trị 30% vào state
        }
    };

    useEffect(() => {
        if (timer >= thirtyPercentTime) {
            setAllowNext(true); // Cho phép chuyển đến video tiếp theo
        } else {
            setAllowNext(false); // Không cho phép chuyển đến video tiếp theo
        }
    }, [timer, thirtyPercentTime]);


    useEffect(() => {
        // Kiểm tra nếu số lần tua video vượt quá 3 lần
        if (seekCount > 3) {
            alert('Cảnh báo: Bạn đã tua video quá 3 lần. Tua video sẽ không tăng thời gian');
            
            // Đặt lại giá trị của các state cần reset
            // setTimer(0);
            setSeekCount(0);
            setIsActive(false);
        }
    }, [seekCount]);

    //Next 
    // Tìm chỉ số của video hiện tại trong mảng lesson
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    useEffect(() => {
        // Tìm chỉ số của video hiện tại trong mảng lesson dựa trên id từ useParams
        const index = lessonsForCourse.findIndex(video => video.id === id);
        if (index !== -1) {
            setCurrentVideoIndex(index);
        }
    }, [id, lesson]);
    // console.log(timer)
    // console.log(thirtyPercentTime)
    const handleNextVideo = (e) => {
            // Kiểm tra nếu thời gian hiện tại lớn hơn hoặc bằng 30% thời lượng video
            const nextVideo = lessonsForCourse[currentVideoIndex + 1];
            const nextVideoId = nextVideo ? nextVideo.id : null;
            // Kiểm tra xem nextVideoId có tồn tại không
        if (timer >= thirtyPercentTime) {
            if (nextVideoId) {
                e.preventDefault();
                // Tăng chỉ số của video hiện tại lên 1 để chuyển đến video tiếp theo
                setCurrentVideoIndex(currentVideoIndex + 1);
                // Điều hướng đến URL của video tiếp theo mà không làm tải lại trang
                navigateTo(`/course/lesson/${nextVideoId}`);
                // Reset lại giá trị
                setTimer(0);
                setSeekCount(0);
                setIsActive(false);
            } else {
                // Xử lý khi không tìm thấy video tiếp theo
                console.log('Không có video tiếp theo');
            }
        }
    };

    // Lùi video
    const handlePrevVideo = (e) => {
        e.preventDefault();
    
        // Kiểm tra xem có phải đang ở video đầu tiên không để ngăn không cho đi lui hơn
        if (currentVideoIndex === 0) {
            console.log('Đã ở video đầu tiên');
            return;
        }
        // Giảm chỉ số của video hiện tại đi 1 để chuyển đến video trước đó
        setCurrentVideoIndex(currentVideoIndex - 1);
        // Lấy id của video trước đó và điều hướng đến URL của nó
        const prevVideoId = lessonsForCourse[currentVideoIndex - 1].id;
        navigateTo(`/course/lesson/${prevVideoId}`);
        // Reset lại giá trị
        setTimer(0);
        setSeekCount(0);
        setIsActive(false);
    };
    // console.log(getLesson)
    // console.log(currentVideoIndex);
    // lessonsForCourse
    return (
        <section className='w-full mx-auto'>
            <div className='flex items-center bg-[#29303b] relative z-1 h-[50px]'>
                <div className='flex cursor-pointer h-[50px] w-[60px] transition-background-color duration-200 ease-linear'><Link to='/'><FaChevronLeft className='mx-[25px] my-[17px] text-white'/></Link></div>
                <Link className='ml-2 relative sm:hidden' to='/'><img className='h-[30px] rounded-lg' src={logo}/></Link>
                <div className='text-14px font-bold text-white ml-4 sm:ml-0'>{getcourseFind.name}</div>
            </div>
            <div className={`mt-[50px] bottom-[50px] border-l border-[#e7e7e7] border-solid fixed lg:right-0 top-0 lg:z-0 z-2 sm:left-0 md:left-0' ${isSplit ? 'lg:w-[23%] z-10 md:bg-white sm:bg-white ' : 'hidden'} transition-width duration-200 ease-linear`}>
            <div className='px-5'>
                    <h2 className='text-[20px] font-bold my-4'>Nội dung khóa học</h2>
                    <div className='mt-3 mb-12'>
                        {lessonsForCourse.map((items, sum) => (
                            <div key={items.id} className='mt-2 cursor-pointer bg-[#f5f5f5] border border-[#ebebeb] p-0 border-solid'>
                               <Link to={`/course/lesson/${items.id}`} >
                                    <h5 className='text-inherit text-16px font-semibold'>
                                        <div className='text-text-color text-16px overflow-hidden py-3.5 pr-7.5 pl-12'>
                                            <span><p className="font-semibold">{sum+1}. {items.title}</p></span>
                                        </div>
                                    </h5>
                               </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`bottom-[50px] left-0 mt-[50px] overflow-y-hidden fixed top-0 ${isSplit ? 'lg:w-[77%] lg:pr-2 w-full '  : 'w-[100%]'} transition-width duration-200 ease-linear`}>
                <div className={`relative w-full bg-black ${isSplit ? 'px-[8.5%] sm:px-0' : 'lg:px-[16%] md:px-[8.5%]'} transition-width duration-200 ease-linear`}>
                    <div className='pt-[56.25%] relative'>
                        <div className='w-full h-full absolute inset-0 overflow-hidden'>
                            {/* Sử dụng key={getLesson.id} để tránh load trang 2 lần  */}
                            <video
                                key={getLesson.id}
                                ref={videoRef}
                                className="w-full h-full aspect-video pointer-events-auto"
                                controls
                                onPlay={handleVideoPlay}
                                onPause={handleVideoPause}
                                onSeeked={handleVideoSeeked}
                                onLoadedMetadata={handleLoadedMetadata} // Sự kiện này để lấy thời gian tổng của video
                            >
                                    <source src={getLesson.videoapi} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={`min-h-[400px] sm:px-4 sm:mt-5 ${isSplit ? 'px-[8.5%]' : 'lg:px-[16%] md:px-[8.5%]'} transition-width duration-200 ease-linear`}>
                    <h1 className='text-[28px] mt-8 mb-2 font-semibold sm:mt-0 sm:line-clamp-2'>{getLesson.title}</h1>
                    <p className='text-13px mt-3 '>Cập nhật {formattedUpdatedAt}</p>
                </div>
            </div>
            <div className='flex items-center lg:justify-center z-2 bg-[#f0f0f0] lg:h-[50px] bottom-0 shadow-[rgba(0,0,0,.1)] left-0 fixed right-0 h-[60px] justify-end'>
                <button className={`flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center md:mr-4 md:p-2.5 ${currentVideoIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`} onClick={currentVideoIndex !== 0 ? handlePrevVideo : undefined}>
                    <FaChevronLeft/>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2'>BÀI TRƯỚC</span>
                </button>
                {allowNext ? (
                    <button  className={`flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center ml-3 md:mr-4 md:p-2.5 ${currentVideoIndex === lessonsForCourse.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`} onClick={currentVideoIndex !== lessonsForCourse.length - 1 ? handleNextVideo : undefined}>
                        <span className='rounded-md text-[#404040] font-semibold px-3 py-2' >BÀI TIẾP THEO</span>
                        <FaChevronRight/>
                </button>
                ) : (
                    <button  className={`flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center ml-3 md:mr-4 md:p-2.5 cursor-not-allowed opacity-50`}>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2' >BÀI TIẾP THEO</span>
                    <FaChevronRight/>
                </button>
                )}
                <div className='flex bottom-0 cursor-pointer lg:justify-end absolute right-0 top-0 lg:w-[30%] items-center justify-start md:left-0 md:w-[26%] sm:left-0'>
                    <button onClick={toggleSplit} className='flex bg-white rounded-full shrink-0 justify-center text-16px h-[38px] w-[38px] mx-5 items-center'>              
                        {isSplit ? <FaArrowRight/> : <FaBars/>}
                    </button>
                </div>
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
    );
}
