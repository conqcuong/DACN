import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Sidebar } from '../components/layout/Sidebar'
import { CourseDetail } from '../components/course/CourseDetail'

export const CourseDetailPage = () => {
    window.scrollTo(0, 0); // Để cuộn đến đầu trang
  return (
    <>
        <Header/>
        <div className='flex min-h-screen '>
            <div className='hidden shrink-0 lg:block'>
                <Sidebar/>
            </div>
            <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4'>
                <section className='w-full max-w-[1920px] p-0 mx-auto'>
                    <CourseDetail/>
                </section>
            </div>
        </div>
        <Footer/>
    </>
  )
}
