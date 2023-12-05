import React, { useRef, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { FaChevronLeft, FaChevronRight, FaBars, FaArrowRight, FaComments, FaXmark } from 'react-icons/fa6'

export const Test = () => {
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

    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0); // Thời gian xem
    const [totalDuration, setTotalDuration] = useState(0); // Tổng thời gian
    const [thirtyPercentTime, setThirtyPercentTime] = useState(0); // 30% video
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [count, setCount] = useState(0);
  const [timerID, setTimerID] = useState(null);
    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(videoRef.current.currentTime);
        };

        const handleVideoIndex = () => {
            const index = lessonsForCourse.findIndex(video => video.id === id);
            if (index !== -1) {
                setCurrentVideoIndex(index);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            videoRef.current.addEventListener('loadedmetadata', () => {
                const duration = videoRef.current.duration;
                setTotalDuration(duration);
                const thirtyPercent = duration * 0.1;
                setThirtyPercentTime(thirtyPercent);
                
            });
        }

        handleVideoIndex();

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [id, lessonsForCourse]);
    const nextVideo = lessonsForCourse[currentVideoIndex + 1];
    const nextVideoId = nextVideo ? nextVideo.id : null;
    console.log(nextVideo);
    const handleNextVideo = (e) => {
        const nextVideo = lessonsForCourse[currentVideoIndex + 1];
        const nextVideoId = nextVideo ? nextVideo.id : null;
        // Kiểm tra xem nextVideoId có tồn tại không
        if(currentTime >= thirtyPercentTime){
            if (nextVideoId) {
                e.preventDefault();
                // Tăng chỉ số của video hiện tại lên 1 để chuyển đến video tiếp theo
                setCurrentVideoIndex(currentVideoIndex + 1);
                // Điều hướng đến URL của video tiếp theo mà không làm tải lại trang
                videoRef.current.currentTime = 0;
                navigateTo(`/Test1/${nextVideoId}`);
            } else {
                // Xử lý khi không tìm thấy video tiếp theo
                console.log('Không có video tiếp theo');
            }
        }
    };
    // console.log(currentTime);
    // console.log(thirtyPercentTime);

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
        videoRef.current.currentTime = 0;
        // Lấy id của video trước đó và điều hướng đến URL của nó
        const prevVideoId = lessonsForCourse[currentVideoIndex - 1].id;
        navigateTo(`/Test1/${prevVideoId}`);
    };
    // console.log(getLesson)
    // console.log(currentVideoIndex);
    // lessonsForCourse
  return (
    <>
        <div className="flex justify-center mt-[120px]">
            <video
                width="640"
                height="360"
                ref={videoRef}
                controls
            >
                <source key={getLesson.id}
                    src={getLesson.videoapi}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div>
                <p>Thời gian xem: {currentTime.toFixed(2)} seconds</p>
                <p>thời gian tổng: {totalDuration.toFixed(2)} seconds</p>
                <p>30% of Video Time: {thirtyPercentTime.toFixed(2)} seconds</p>
            </div>
        </div>
        <p className="flex justify-center">{getLesson.title}</p>
        <div className='flex items-center lg:justify-center z-2 bg-[#f0f0f0] lg:h-[50px] bottom-0 shadow-[rgba(0,0,0,.1)] left-0 fixed right-0 h-[60px] justify-end'>
                <button className={`flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center md:mr-4 md:p-2.5 ${currentVideoIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`} onClick={currentVideoIndex !== 0 ? handlePrevVideo : undefined}>
                    <FaChevronLeft/>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2'>BÀI TRƯỚC</span>
                </button>
                <button  className={`flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center ml-3 md:mr-4 md:p-2.5 ${currentVideoIndex === lessonsForCourse.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`} onClick={currentVideoIndex !== lessonsForCourse.length - 1 ? handleNextVideo : undefined}>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2' >BÀI TIẾP THEO</span>
                    <FaChevronRight/>
                </button>
                <div className='flex bottom-0 cursor-pointer lg:justify-end absolute right-0 top-0 lg:w-[30%] items-center justify-start md:left-0 md:w-[26%] sm:left-0'>
                </div>
            </div>
    </>    
  )
}
