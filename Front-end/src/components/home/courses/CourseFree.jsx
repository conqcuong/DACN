import React from 'react';
import { Link } from 'react-router-dom'
import { FaChevronRight, FaArrowRight } from 'react-icons/fa6'
import {  useSelector } from 'react-redux'
import {FaUsers} from "react-icons/fa6"

export const CourseFree = () => {
    const courses = useSelector((state)=> state.course.listCourses);
    // Cho vào mảng biết thể loại thành chữ thường và so sánh
    const filterCoursesByCategory = (courses, category) => {
        return courses && courses.filter((course) => course && course.category && course.category.toLowerCase() === category.toLowerCase());
    };
    const listCourses = filterCoursesByCategory(courses, 'free');

  return (
    <>
        <div className='mb-2'>
            <div>
                <p className='text-[#82919b] text-14px mt-3.5'><strong>361.325+</strong> người khác học</p>
                <div className='flex items-baseline'>
                    <h2 className='text-[24px] font-black mr-auto mt-3 mb-[15px]'>
                        <Link className='text-black'>Khóa học miễn phí
                            <span className='hidden relative text-center ml-2.5 top-[-2px] sm:inline-block'><FaArrowRight className='text-11px'/></span>
                        </Link>
                    </h2>
                    <Link className='group flex bg-transparent text-primary-color text-15px font-semibold py-2 pl-2 hover:underline sm:hidden'>Xem lộ trình <FaChevronRight className='ml-1 text-[11px] mt-1.5 relative transition duration-300 ease-in-out group-hover:-translate-x-[-5px]'/></Link>
                </div>
            </div>
            {/* ** */}
            <div className='min-h-[200px] pt-[3px] pb-4 overflow-x-auto overflow-y-hidden lg:overflow-hidden lg:block lg:pb-0 lg:pt-0 sm:min-h-[180px]'>
                <section className='flex lg:flex-wrap lg:mx-[-12px]'>
                    {listCourses && listCourses.map((items, index) =>(
                        // Thêm margin-left 16px cho phần tử thứ 2 trở đi
                        <section key={items._id} className={`block w-1/4 lg:px-3 md:w-[35vw] flex-shrink-0 sm:w-[60vw] lg:ml-0 ${ index > 0 ? 'ml-4' : '' }`}>
                            <div className='relative shrink-0 lg:mb-8 sm:mb-1'>
                                <Link to={`/course/details/${items._id}`} className='commonItem_link common_has block object-cover rounded-2xl overflow-hidden pt-[56.25%] relative w-full'>
                                    <button className='course_btn common_btn bg-white text-black border-white '>Xem Khóa học</button>
                                    <img className='h-full left-0 object-cover absolute top-0 w-full' src={items.cover}/>
                                </Link>
                                {/* Link to={nav.path} target='_self' */}
                                <h3 className='font-light my-2'><Link to={`/course/details/${items._id}`} className='break-words line-clamp-1 text-[#292929] text-16px leading-6 font-semibold'>{items.name}</Link></h3>
                                <div className='flex text-14px text-gray-color sm:hidden'>
                                    <FaUsers className='mt-[1px] text-17px'/>
                                    <span className='ml-2'>{items.sum}</span>
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
