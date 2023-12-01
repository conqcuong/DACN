import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import htmlPro from '../../assets/imgs/banners/htmlcssPro.png'
import react from '../../assets/imgs/banners/react.png'

export const SlideHome = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    }
  return (
    <>
        <div className="min-h-[270px rounded-2xl">
            <Slider {...settings}>
                <div>
                    <div className='flex h-[270px] rounded-2xl overflow-hidden bg-gradient-to-r from-custom-via to-custom-pink'>
                        <div className="flex flex-col justify-center shrink-0 text-[16px] text-[#fff] max-w-full w-[640px] pb-9 px-9">
                            <h2 className='mt-[30px] mb-2.5 pb-1 sm:line-clamp-2'>
                                <Link className='text-[#fff] text-[32px] font-bold leading-6 sm:leading-10'>Học HTML CSS cho người mới</Link>
                            </h2>
                            <p className='max-w-[600px] mt-0 mb-6 leading-[26px] sm:line-clamp-2 sm:mb-5'>
                                Thực hành dự án với Figma, hàng trăm bài tập và thử thách, hướng dẫn 100% bởi Sơn Đặng, tặng kèm Flashcards, v.v.
                            </p>
                            <div>
                                <Link className='inline-block text-[14px] border-2 rounded-2xl border-white font-bold min-w-[124px] text-center px-2.5 py-[5px] uppercase duration-100 ease-in hover:bg-[#fff] hover:text-[#6828fa]'>Học thử miễn phí</Link>
                            </div>
                        </div>
                        <div className="hidden justify-end flex-grow flex-shrink lg:flex">
                            <Link><img className='block h-full object-cover' src={htmlPro} alt="" /></Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex h-[270px] rounded-2xl overflow-hidden bg-gradient-to-r from-custom-blue to-dark-purple'>
                        <div className="flex flex-col justify-center shrink-0 text-[16px] text-[#fff] max-w-full w-[640px] pb-9 px-9">
                            <h2 className='mt-[30px] mb-2.5 pb-1 sm:line-clamp-2'>
                                <Link className='text-[#fff] text-[32px] font-bold leading-6 sm:leading-10'>Học ReactJS Miễn Phí! </Link>
                            </h2>
                            <p className='max-w-[600px] mt-0 mb-6 leading-[26px] sm:line-clamp-2 sm:mb-5'>
                                Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS.
                            </p>
                            <div>
                                <Link className='inline-block text-[14px] border-2 rounded-2xl border-white font-bold min-w-[124px] text-center px-2.5 py-[5px] uppercase duration-100 ease-in hover:bg-[#fff] hover:text-[#2877FA]'>ĐĂNG KÝ NGAY</Link>
                            </div>
                        </div>
                        <div className="hidden justify-end flex-grow flex-shrink lg:flex">
                            <Link><img className='block h-full object-cover' src={react} alt="" /></Link>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    </>
  )
}
