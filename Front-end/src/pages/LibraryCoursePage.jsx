import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Sidebar } from '../components/layout/Sidebar'
import { Link, Navigate } from 'react-router-dom'
import { LibraryCourse } from '../components/course/LibraryCourse'

export const LibraryCoursePage = () => {
    const currentUser = useSelector(state => state.auth.login.currentUser);
  return (
    <>
        <Header />
        <div className='flex min-h-screen '>
            <div className='hidden shrink-0 lg:block'>
                <Sidebar />
            </div>
            <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4'>
                <section className='w-full max-w-[1920px] p-0 mx-auto'>
                    <div className='pb-12 lg:px-11 lg:pt-2 lg:mb-15'>
                        {currentUser && currentUser.id ? ( // Kiểm tra xem currentUser có tồn tại và có id không
                        <>
                            <div className='mb-3 lg:mb-10'>
                                <h1 className='text-#242424 text-[28px] font-black lg:my-[18.760px]'>Thư viện khóa học</h1>
                                <div className='break-words text-[#292929] text-15px max-w-[840px]'><p className='mt-1.5 mb-5'>Đây là tất cả các khóa học trên trang web của bạn.</p></div>
                                    <Link to='/course/create'><button className='text-white font-semibold text-whit bg-primary-color rounded-[99px] py-2 px-5 inline-block'>Tạo khóa học</button></Link>
                            </div>
                            <div>
                                <LibraryCourse />
                            </div>
                        </>
                         ) : (
                        // Nếu không có id, chuyển hướng về trang đăng nhập
                            <Navigate to="/login" />
                         )}
                    </div>
                </section>
            </div>
        </div>
        <Footer />
    </>
  )
}
