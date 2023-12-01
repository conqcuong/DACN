import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEllipsis } from 'react-icons/fa6'
import { useSelector, useDispatch } from "react-redux";
import showToast from '../../redux/showToast'

export const LibraryCourse = () => {
    /**/
    // Sử kiện ấn nút " ... "
    const [openId, setOpenId] = useState(null);
    const imgRefs = useRef([]);
    const handleClick = (event, id) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan rộng để tránh đóng lại ngay lập tức
        setOpenId(openId === id ? null : id);
    };
    const handleClickOutside = (event) => {
        if (imgRefs.current.every((ref) => ref && !ref.contains(event.target))) {
        setOpenId(null);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    // Lấy All dữ liệu thông tin user và courses
    const user = useSelector((state) => state.auth.login.currentUser);
    const courses = useSelector((state)=> state.course.listCourses);
    // Lọc các khóa học của người dùng hiện tại
    const userCourses = courses.filter((course) => course.user === user.id);
    // Delete
    const dispatch = useDispatch();
    const handleDel = (id) => {
        try {
            if(window.confirm('Do you want to remove?')){
                DeleteCourse(dispatch, id, showToast);
            }
        } catch (error) {
            toast.error('Delete failed.');
        }
      };
  return (
    <>
        <section className='flex flex-wrap mx-[-12px]'>
            <section className='block px-3 lg:w-4/6'>
                <div className='pb-11 lg:pr-16'>
                    { userCourses && userCourses.map((items) => (
                        <div className={` p-6 rounded-2xl border-2 border-[#e8e8e8] relative ${items.id !== userCourses[0].id ? 'mt-4' : ''}`} key={items.id}>
                            <div className='flex '>
                                <div className='min-w-[228px] relative'>
                                    <img className='w-[228px] rounded-2xl' src={items.cover} />
                                </div>
                                <div className='flex-1 ml-6'>
                                    <div>
                                        <h2 className='text-[18px] font-bold flex items-center justify-between'>{items.name}
                                        <span className='hover:cursor-pointer' onClick={(e) => handleClick(e, items.id)}><FaEllipsis/></span>
                                        </h2>
                                        <span className='text-primary-color text-16px font-semibold mt-1'>{items.price_sale}</span>
                                    </div>
                                    <p className='text-14px my-2 line-clamp-2'>{items.title}</p>
                                    <Link to={`/course/${items.id}`}><button className='text-white font-semibold text-whit bg-primary-color rounded-[99px] py-2 px-5'>Xem chi tiết</button></Link>
                                </div>
                            </div>
                            {
                                openId === items.id && (
                                <div className='z-9999 absolute top-10 right-0 bottom-auto left-auto transform translate-x-[-22.3333px] translate-y-[10px]'>
                                    <ul className='min-w-[200px] py-2 m-0 rounded-[10px] bg-white overflow-hidden shadow-2xl'>
                                        <Link to={`/course/edit/${items.id}`} className='text-[#444] cursor-pointer block text-14px py-2 px-5'>Chỉnh sửa</Link>
                                        <li onClick={() => handleDel(items.id)} className='text-[#444] cursor-pointer block text-14px py-2 px-5'>Xóa</li>
                                    </ul>
                                </div>
                            )}
                        </div>                
                    ))}
                </div>
            </section>
            {/* <section className='block px-3 lg:w-4/12 md:order-[-1] mb-10 lg:mb-0'>
                <div>
                    <h3 className='text-[#757575] text-14px font-semibold leading-[18px] uppercase my-3.5'>Các chủ đề được đề xuất</h3>
                    <ul className='flex flex-wrap text-14px'>
                        <li><Link className='bg-[#f2f2f2] text-text-color block px-4 py-1.5 mt-2 ml-2 rounded-[16px] font-semibold'>Front-end / Mobile apps</Link></li>
                        <li><Link className='bg-[#f2f2f2] text-text-color block px-4 py-1.5 mt-2 ml-2 rounded-[16px] font-semibold'>Back-end / Devops</Link></li>
                        <li><Link className='bg-[#f2f2f2] text-text-color block px-4 py-1.5 mt-2 ml-2 rounded-[16px] font-semibold'>UI / UX / Design</Link></li>
                        <li><Link className='bg-[#f2f2f2] text-text-color block px-4 py-1.5 mt-2 ml-2 rounded-[16px] font-semibold'>Others</Link></li>           
                    </ul>
                </div>
            </section> */}
        </section>
    </>
  )
}
