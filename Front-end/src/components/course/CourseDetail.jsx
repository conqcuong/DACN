import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export const CourseDetail = () => {
    // id chi tiết khóa học
    const { id } = useParams();
    // ép kiểu về int
    const courseId = parseInt(id);
    // lấy khóa học có cùng id
    const Courses = useSelector((state) => state.course.listCourses);
    const course = Courses.find(g => g.id === courseId);
    // Lấy dữ liệu từ store
    const Lesson = useSelector((state) => state.lesson.listLessons);
    // Lọc ra các bài học có cùng id với khóa học
    const lessonsForCourse = Lesson.filter(lesson => lesson.productId === courseId);
    // const lessonsForCourse = Lesson
    // console.log(lessonsForCourse)
  return (
    <>
        <section className='mt-6 pr-11 pl-40 lg:mx-[-12px] md:mx-[-8px] md:flex-wrap sm:px-0 flex'>
            <div className='lg:w-2/3 lg:block px-4 flex flex-col sm:px-0'>
                <h1 className='text-#242424 text-[32px] font-bold lg:my-[18.760px] sm:text-[22px] sm:my-0'>
                    {course.name}
                </h1>
                <div className='break-words text-[#292929] text-15px'>
                    <p className='my-1.5 text-14px'>{course.description}</p>
                </div>
                <div className='order-2'>
                    <h2 className='text-[20px] font-bold my-4'>Nội dung khóa học</h2>
                    <Link to='/course/lesson/create'><button className='text-white font-semibold text-whit bg-primary-color rounded-[99px] py-2 px-5 inline-block'>Tạo bài học</button></Link>
                    <div className='mt-3 mb-12'>
                        {lessonsForCourse &&
                            lessonsForCourse.map((items, index) => (
                            <div key={items.id} className={`mt-2 cursor-pointer border border-[#ebebeb] p-0 border-solid flex justify-between ${
                                index === 0 ? '' : 'pointer-events-none opacity-50' // Phần tử đầu không bị làm mờ
                                }`} onClick={() => {
                                    if (index === 0) {
                                    // Xử lý khi click vào phần tử đầu tiên
                                    console.log('Clicked on the first element.');
                                }}}>
                                <Link to={`/course/lesson/${items.id}`} className='w-[83%]'>
                                    <h5 className='text-inherit text-16px font-semibold'>
                                        <div className='text-text-color text-16px overflow-hidden py-3.5 pr-7.5 pl-12'>
                                            <span><p className='font-bold'>{index + 1}. {items.title}</p></span>
                                        </div>
                                    </h5>
                                </Link>
                                <div className='flex gap-6 mr-5 self-center text-11px font-semibold'>
                                    <span className='px-2 py-1 bg-primary-color text-white' onClick={() => handleDel(items.id)}>Xóa</span>
                                    <Link to={`/lesson/edit/${items.id}`} className='px-2 py-1 bg-primary-color text-white'>Chỉnh sửa</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='lg:w-1/3 lg:block px-4 hidden'>
                <div className='flex items-center bg-white flex-col lg:mb-15 lg:ml-6'>
                    <div className='hidden mt-0.5 mb-5 overflow-hidden w-[calc(100%_-_2px)] lg:block'>
                        <img className='rounded-2xl' src={course.apiimage}/>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
