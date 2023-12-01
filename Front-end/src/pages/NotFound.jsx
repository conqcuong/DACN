import React from 'react'
import logo from '../assets/imgs/f8-icon.png'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <>
        <div>
            <div className='flex flex-col text-15px h-screen min-h-full min-w-full'>
                <div className='flex items-center p-5 sm:hidden'>
                    <Link className='block' to='/'><img className='h-9.5 w-9.5 rounded-lg ' src={logo} alt="" /></Link>
                    <p className='font-black ml-3 text-14px'><Link className='text-[#242424]' to='/'>Học Lập Trình Để Đi Làm</Link></p>
                </div>
                <div className='flex items-center flex-col min-w-[300px] md:max-w-[410px] md:mx-auto sm:px-4 sm:w-full'>
                    <h2 className='not sm:my-0'>&nbsp</h2>
                    <h1 className='font-black text-[45px] text-center mb-[30px]'>Không tìm thấy nội dung 😓</h1>
                    <ul className='mt-9 mb-8 font-medium text-16px'>
                        <li className='text-center pb-1'>URL của nội dung này đã <strong>bị thay đổi</strong> hoặc <strong>không còn tồn tại</strong></li>
                        <li className='text-center pb-1'>Nếu bạn <strong>đang lưu URL này</strong>, hãy thử <strong>truy cập lại từ trang chủ</strong> thay vì dùng URL đã lưu.</li>
                    </ul>
                    <p><Link className='py-3.5 px-7 text-16px font-semibold text-center inline-block rounded-[999px] bg-primary-color my-7 text-white' to='/'>Truy cập trang chủ</Link></p>
                </div>
                <div className='flex items-end text-gray-color flex-1 text-14px font-bold justify-center text-center w-full mb-5 sm:hidden'>© 2018 - 2023 F8. Nền tảng học lập trình hàng đầu Việt Nam</div>
            </div>
        </div>
    </>
  )
}
