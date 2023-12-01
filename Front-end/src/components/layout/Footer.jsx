import React from 'react'
import Logo from '../../assets/imgs/f8-icon.png'
import DMCA from '../../assets/imgs/DMCA.png'
import { footer_product, tools_list, list_f8 } from '../../static/data'
import { Link } from "react-router-dom"
import { FaSquareYoutube, FaSquareFacebook, FaTiktok } from 'react-icons/fa6'

export const Footer = () => {
  return (
    <>
        <footer className='bg-[#181821] text-[#a9b3bb] pt-[68px] pb-10 sm:px-4 sm:pt-12 sm:pb-10'>
            <section className='max-w-[1100px] w-full mx-auto p-0 md:w-[644px]'>
                <div className='flex mx-[-12px] md:mx-[-8px] md:flex-wrap sm:flex-wrap sm:mx-[-4px]'>
                    <div className="block lg:w-1/4 px-3 md:px-2 sm:px-1">
                        <div className='flex justify-start lg:justify-center'>
                            <div>
                                <div className='flex items-center'>
                                    <Link href="/"><img className='rounded-lg w-[38px] h-[38px] mr-2.5' src={Logo} alt="F8" /></Link>
                                    <h2 className='font-bold text-[#fff]'>Học Lập Trình Để Đi Làm</h2>
                                </div>
                                <p className="relative text-14px leading-[22px] my-3.5">
                                    Điện thoại: <a href="tel:0246.329.1102">0246.329.1102</a>
                                    <br />
                                    Email: <a href="mailto:contact@fullstack.edu.vn">contact@fullstack.edu.vn</a>
                                    <br />
                                    Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội
                                </p>
                                <div>
                                    <a href="/" title='DMCA Protected'>
                                        <img className='mt-7 w-[121px]' src={DMCA} alt="DMCA" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block w-1/6 px-3 md:w-2/6 md:px-2 sm:w-full sm:px-1">
                        <div className="flex justify-start lg:justify-center">
                            <div>
                                <h2 className="text-[18px] leading-4 uppercase mt-2.5 mb-[15px] font-semibold text-[#fff] sm:mt-9">VỀ F8</h2>
                                <ul className="my-2.5">
                                    {list_f8.map((e, i) => (
                                        <li className='mb-2 text-14px' key={i}>
                                            <Link className='text-[#a9b3bb]' to={e.path}>{e.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="block w-1/6 px-3 md:w-2/6 md:px-2 sm:w-full sm:px-1">
                        <div className="flex justify-start lg:justify-center">
                            <div>
                                <h2 className="text-[18px] leading-4 uppercase mt-2.5 mb-[15px] font-semibold text-[#fff] sm:mt-9">SẢN PHẨM</h2>
                                <ul className="my-2.5">
                                    {footer_product.map((e, i) => (
                                        <li className='mb-2 text-14px' key={i}>
                                            <Link className='text-[#a9b3bb]' to={e.path}>{e.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="block w-1/6 px-3 md:w-2/6 md:px-2 sm:w-full sm:px-1">
                        <div className="flex justify-start lg:justify-center">
                            <div>
                                <h2 className="text-[18px] leading-4 uppercase mt-2.5 mb-[15px] font-semibold text-[#fff] sm:mt-9">CÔNG CỤ</h2>
                                <ul className="my-2.5">
                                    {tools_list.map((e, i) => (
                                        <li className='mb-2 text-14px' key={i}>
                                            <Link className='text-[#a9b3bb]' to={e.path}>{e.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='block w-1/4 px-3 md:w-3/6 md:px-2 sm:w-full sm:px-1'>
                        <div className="flex justify-start lg:justify-center text-14px ">
                            <div>
                                <h2 className="text-[18px] leading-[28px] uppercase  mb-[15px] font-semibold text-[#fff] sm:mt-9">CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8</h2>
                                <ul className="my-2.5">
                                    <li className='mb-2'>Mã số thuế: 0109922901</li>
                                    <li className='mb-2'>Ngày thành lập: 04/03/2022</li>
                                    <li className='mb-0.5'>Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát triển những sản phẩm mang lại giá trị cho cộng đồng.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mx-[-12px] md:mx-[-8px] md:flex-wrap sm:flex-wrap sm:mx-[-4px]'>
                    <div className="block w-full px-3">
                        <div className='flex mt-12 sm:flex-col'>
                            <p className="my-3.5 text-14px">© 2018 - 2023 F8. Nền tảng học lập trình hàng đầu Việt Nam</p>
                            <div className="flex ml-auto sm:mt-3 sm:ml-0">
                                <Link><FaSquareYoutube className='text-[#eb2c3b] text-[32px]'/></Link>
                                <Link><FaSquareFacebook className='text-[#4867aa] text-[32px] mx-[16px]'/></Link>
                                <Link><FaTiktok className='text-[#ccc] text-[32px]'/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>        
    </>
  )
}
