import React, { useRef, useState, useEffect } from 'react';

export const VideoPlayer = () => {
    const [timer, setTimer] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [thirtyPercentTime, setThirtyPercentTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [seekCount, setSeekCount] = useState(0);
    const videoRef = useRef(null);

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
            const thirtyPercent = duration * 0.3; // Tính toán 30% của thời gian tổng
            setThirtyPercentTime(thirtyPercent); // Lưu giá trị 30% vào state
        }
    };

    useEffect(() => {
        // Kiểm tra nếu số lần tua video vượt quá 3 lần
        if (seekCount > 3) {
            alert('Cảnh báo: Bạn đã tua video quá 3 lần.');
            
            // Đặt lại giá trị của các state cần reset
            setTimer(0);
            setSeekCount(0);
            setIsActive(false);
        }
    }, [seekCount]);

    return (
        <div>
            <video
                ref={videoRef}
                width="640"
                height="360"
                controls
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onSeeked={handleVideoSeeked}
                onLoadedMetadata={handleLoadedMetadata} // Sự kiện này để lấy thời gian tổng của video
            >
                <source src="https://springbootcourse.s3-ap-southeast-2.amazonaws.com/1701530272001_1701250969285_IMG_2378.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231204T135033Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518399&X-Amz-Credential=AKIA3EDNXGDIUJNPCRNZ%2F20231204%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=245461a3a4db9109b73ee8e2f91e701fd3c277d06f86d0754aad7f3f279b186c" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div>
                <p>Thời gian đồng hồ: {timer} giây</p>
                <p>Thời gian tổng của video: {totalTime} giây</p>
                <p>30% của thời gian tổng: {thirtyPercentTime} giây</p>
            </div>
            <div>
                <button className='cursor-not-allowed opacity-50'>Next</button>
            </div>
        </div>
    );
}
