import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import {FaBatteryFull, FaGaugeHigh} from 'react-icons/fa6'
import { getPayLesson} from '../../redux/apiRequest';
import axios from 'axios';

export const Course = () => {
    const dispatch = useDispatch();
    // lấy đường dẫn PayVn
    // id chi tiết khóa học
    const { id } = useParams(); 
    const courseId = parseInt(id);
    const userId = useSelector((state) => state.auth.login.currentUser?.id); //user id
    // console.log(userId)
    // lấy khóa học có cùng id
    const Courses = useSelector((state) => state.course.listCourses);
    const course = Courses.find(g => g.id === courseId);
    // Lấy dữ liệu từ store
    const Lesson = useSelector((state) => state.lesson.listLessons);
    // Lọc ra các bài học có cùng id với khóa học
    const lessonsForCourse = Lesson.filter(lesson => lesson.productId === courseId);
    // Lấy 1 khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Thực hiện request để lấy thông tin thanh toán từ API
                await getPayLesson(dispatch, userId, courseId,);
                // console.log('Lấy dữ liệu thành công');
            } catch (err) {
                console.log('Lỗi khi lấy dữ liệu:', err);
            }
        }
        fetchData();
    }, [dispatch]);
    // Hàm thanh toán
    const handlePayment = async (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                // Thực hiện request để lấy thông tin thanh toán từ API
                const response = await axios.get(`http://localhost:9002/api/v1/pay/${courseId}/${userId}`);
                const payment = response.data;
                // Xử lý dữ liệu thanh toán ở đây (ví dụ: in thông tin ra console)
                window.location.href = payment
            } catch (err) {
                console.log('Lỗi khi lấy dữ liệu thanh toán:', err);
            }
        }
        fetchData();
    }
    // console.log(lessonsForCourse)
    // const listPayLesson = useSelector((state) => state.userCourse.userCourse)?.id;
    
    const listPayLesson = useSelector((state) => state.userCourse.listPayCourse); // Lấy các bài học đã mua
    const firsSuccessOne = listPayLesson.find(item => item.success === 0);
    const lastSuccessId = firsSuccessOne?.productid;
    const lessonId = firsSuccessOne?.lessionId;
    // console.log(lastSuccessId)

    return (
    <>
        {lastSuccessId && courseId === lastSuccessId ? (
      // Dùng lastSuccessId hoặc lastCompletedLesson tùy vào điều kiện
            <Navigate to={`/course/lesson/` + (lessonId || lastCompletedLesson)} />
        ) : (
            <div className='flex mt-6 px-11 lg:mx-[-12px] md:mx-[-8px] md:flex-wrap sm:px-0'>  
                <div className='lg:w-2/3 lg:block px-4 flex flex-col sm:px-0'>
                    <h1 className='text-#242424 text-[32px] font-bold lg:my-[18.760px] sm:text-[22px] sm:my-0'>{course.name}</h1>
                    <div className='break-words text-[#292929] text-15px'><p className='my-1.5'>{course.description}.</p></div>
                    <div className='order-2'>
                        <h2 className='text-[20px] font-bold my-4'>Nội dung khóa học</h2>
                        <div className='mt-3 mb-12'>
                        { lessonsForCourse.map((items, sum) => (
                            // <Link  to={`/course/lesson/${items.id}`}>
                                
                            // </Link>
                            <div key={items.id} className='mt-2 cursor-pointer bg-[#f5f5f5] border border-[#ebebeb] p-0 border-solid flex justify-between pointer-events-none opacity-70'>
                                    <h5 className='text-inherit text-16px font-semibold'>
                                        <div className='text-text-color text-16px overflow-hidden py-3.5 pr-7.5 pl-12'>
                                            <span><p className='font-medium'>{sum+1}. {items.title}</p></span>                                      
                                        </div>
                                    </h5>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className='lg:hidden block md:w-full order-1 my-5'>
                        <div className='flex items-center bg-white flex-col lg:mb-15 lg:ml-6 border border-[#ebebeb] border-solid'>
                            <h5 className='text-primary-color text-[32px] font-normal mx-auto opacity-80 mt-5'>Miễn phí</h5>
                            <button className='text-16px mt-4 min-w-[180px] px-4 py-2.5 bg-primary-color text-white font-semibold rounded-full'>Đăng ký học</button>
                            <ul className='inline-block pt-6 pb-2.5 pl-1 text-left sm:pb-6'>
                                <li className='text-[#494949] text-14px mb-2.5'><span className='flex'><FaGaugeHigh className='mt-1 mr-4'/><span>Trình độ cơ bản</span></span></li>
                                <li className='text-[#494949] text-14px mb-2.5'><span className='flex'><FaBatteryFull className='mt-1 mr-4'/><span>Học mọi lúc, mọi nơi</span></span></li>
                            </ul>
                        </div>
                    </div> 
                </div>      
                <div className='lg:w-1/3 lg:block px-4 hidden'>
                    <div className='flex items-center bg-white flex-col lg:mb-15 lg:ml-6'>
                        <div className='hidden mt-0.5 mb-5 overflow-hidden w-[calc(100%_-_2px)] lg:block'>
                            {/* <iframe className="w-full aspect-video pointer-events-auto" src="https://www.youtube.com/embed/xNRJwmlRBNU"></iframe> */}
                            <img className='rounded-2xl' src={course.apiimage}/>
                        </div>
                        <h5 className='text-primary-color text-[32px] font-normal mx-auto opacity-80'>{(course.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</h5>
                        <button onClick={handlePayment} className='text-16px mt-4 min-w-[180px] px-4 py-2.5 bg-primary-color text-white font-semibold rounded-full'>Mua Khóa Học</button>
                        <ul className='inline-block pt-6 pb-2.5 pl-1 text-left'>
                            <li className='text-[#494949] text-14px mb-2.5'><span className='flex'><FaGaugeHigh className='mt-1 mr-4'/><span>Trình độ cơ bản</span></span></li>
                            <li className='text-[#494949] text-14px mb-2.5'><span className='flex'><FaBatteryFull className='mt-1 mr-4'/><span>Học mọi lúc, mọi nơi</span></span></li>
                        </ul>
                    </div>
                </div>      
            </div>
        )}
    </>
  )
}
