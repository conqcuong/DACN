import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Sidebar } from '../components/layout/Sidebar'
import { SlideHome } from '../components/home/SlideHome'
import { CoursePro } from '../components/home/courses/CoursePro';
import { CourseFree } from '../components/home/courses/CourseFree';
import { Loading } from '../components/layout/Loading';
import { useSelector } from "react-redux";

export const HomePage = () => {
    const loading = useSelector(state => state.course.loading);
    useEffect(() => {
        if (loading) {
          // Nếu trạng thái loading là true, ngăn chặn cuộn trang bằng cách thêm overflow: hidden cho body
          document.body.style.overflow = 'hidden';
        } else {
          // Nếu trạng thái loading không còn true, loại bỏ thuộc tính overflow: hidden để cho phép cuộn trang
          document.body.style.overflow = 'unset';
        }
    }, [loading]);
  return (
    <>
        <Header/>
        <div>
            {loading ? (
                <>
                    <Loading/>
                    <div className='flex min-h-screen sm:min-w-full'>
                        <div className='hidden shrink-0 lg:block'>
                            <Sidebar/>
                        </div>
                        <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4 overflow-hidden'>
                            <section className="w-full max-w-[1920px] p-0 mx-auto">
                                <div className="mt-[18px]">
                                    <SlideHome/>
                                </div>
                                <div className='mt-17.5 overflow-hidden lg:px-11 lg:pb-18.5 md:pb-15'>
                                    <CoursePro/>
                                    {/* <CourseFree/> */}
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            ):(<>
                <div className='flex min-h-screen sm:min-w-full'>
                    <div className='hidden shrink-0 lg:block'>
                        <Sidebar/>
                    </div>
                    <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4 overflow-hidden'>
                        <section className="w-full max-w-[1920px] p-0 mx-auto">
                        <div className="mt-[18px]">
                            <SlideHome/>
                        </div>
                        <div className='mt-17.5 overflow-hidden lg:px-11 lg:pb-18.5 md:pb-15'>
                            <CoursePro/>
                            {/* <CourseFree/> */}
                        </div>
                        </section>
                    </div>
                </div>
            </>)}
        </div>
        <Footer/>
    </>
  )
}
