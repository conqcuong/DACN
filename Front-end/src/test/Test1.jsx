import React from 'react'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { Footer } from '../components/layout/Footer'

export const Test1 = () => {
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
                        <div className='mb-3 lg:mb-10'>
                            <h1 className='text-#242424 text-[28px] font-black lg:my-[18.760px]'>Lịch sử đơn hàng</h1>
                            <div className='break-words text-[#292929] text-15px max-w-[840px]'><p className='mt-1.5 mb-5'>Đây là tất cả hóa đơn lúc mua khóa học trên web.</p></div>
                        </div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-[#e8e8e8]">
                            <table class="w-full text-sm text-left rtl:text-right text-black">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">Mã đơn hàng</th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">Tên Khóa học</div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">Giá</div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">Tình trạng</div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">Ngày mua</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-y border-[#e8e8e8] ">
                <th scope="row" class="px-6 py-4 font-medium text-[#292929] whitespace-nowrap ">
                #5
                </th>
                <td class="px-6 py-4">
                Lập trình C++ cơ bản, nâng cao
                </td>
                <td class="px-6 py-4">
                999.999đ
                </td>
                <td class="px-6 py-4">
                    Thành công
                </td>
                <td class="px-6 py-4">
                    15/12/2023
                </td>
                                    </tr>
            <tr class="bg-white border-y border-[#e8e8e8]">
                <th scope="row" class="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">
                #12
                </th>
                <td class="px-6 py-4">
                Node & ExpressJS
                </td>
                <td class="px-6 py-4">
                100.000đ
                </td>
                <td class="px-6 py-4">
                    Thành công
                </td>
                <td class="px-6 py-4">
                    15/12/2023
                </td>
            </tr>
            <tr class="bg-white border-y border-[#e8e8e8]">
                <th scope="row" class="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">
                #14
                </th>
                <td class="px-6 py-4">
                Viết ứng dụng bán hàng với Java Springboot/API và Angular
                </td>
                <td class="px-6 py-4">
                249.000đ
                </td>
                <td class="px-6 py-4">
                    Thành công
                </td>
                <td class="px-6 py-4">
                    15/12/2023
                </td>
            </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Footer />
    </>
  )
}
