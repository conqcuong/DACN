import { useState } from 'react';
import { Link } from "react-router-dom"
import CourseIcon from '../../../assets/king.svg'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton';

export const CoursePro = () => {
    const courses = useSelector((state)=> state.course.listCourses);
    // Cho vào mảng biết thể loại thành chữ thường và so sánh
    const filterCoursesByCategory = (courses, category) => {
        return courses && courses.filter((course) => course && course.category && course.category.toLowerCase() === category.toLowerCase());
    };
    // filterCoursesByCategory(courses, 'pro');
    const listCourses = courses;

  return (
    <>
        <div className='mb-2'>
            <div>
                <div className='flex items-baseline'>
                    <h2 className='text-[#242424] text-[24px] font-black mr-auto mt-4 mb-[15px]'><span>Khóa học Pro <span className='bg-[#1473e6] rounded text-white text-12px font-semibold px-1.5 py-[3px] relative uppercase top-[-6px] right-[-8]'>Mới</span></span> </h2>
                </div>
            </div>
            {/* ** */}
            <div className='min-h-[200px] pt-[3px] pb-4 overflow-x-auto overflow-y-hidden lg:overflow-hidden lg:block lg:pb-0 lg:pt-0 sm:min-h-[180px]'>
                <section className='flex lg:flex-wrap lg:mx-[-12px]'>
                    {listCourses && listCourses.map((items, index) =>(
                        // Thêm margin-left 16px cho phần tử thứ 2 trở đi
                        <section key={items.id} className={`block w-1/4 lg:px-3 md:w-[35vw] flex-shrink-0 sm:w-[60vw] lg:ml-0 ${ index > 0 ? 'ml-4' : '' }`}> 
                            <div className='relative shrink-0 lg:mb-8 sm:mb-1'>
                                <Link to={`/course/details/${items.id}`} className='commonItem_link common_has block object-cover rounded-2xl overflow-hidden pt-[56.25%] relative w-full'>
                                    <button className='course_btn common_btn bg-white text-black border-white '>Xem Khóa học</button>
                                    <img className='h-full left-0 object-cover absolute top-0 w-full' src={items.apiimage || <Skeleton count={5}/>} alt="HTML CSS Pro" />
                                </Link>
                                {/* Link to={nav.path} target='_self' */}
                                <h3 className='font-light my-2'><Link to={`/course/details/${items.id}`} className='break-words line-clamp-1 text-[#292929] text-16px leading-6 font-semibold'>{items.name }</Link></h3>
                                <div className="rounded-lg left-3 p-[5px] pointer-events-none absolute top-3 w-6.5 bg-[rgba(0,0,0,.3)]">
                                    <img src={CourseIcon} alt="" />
                                </div>
                                <div>
                                    {/* <span className='text-14px mr-2 line-through'>{items.price}</span> */}
                                    <span className='text-16px text-primary-color font-semibold'>{(items.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                </div>
                            </div>
                        </section>
                    ))}
                </section>
            </div>
        </div>   
    </>
  )
}


