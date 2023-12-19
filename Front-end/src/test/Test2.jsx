import React from 'react';

export const Test2 = () => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 px-5">
                    <div>
                        <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-black ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Mã đơn hàng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên Người mua
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên Khóa học
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Giá
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tình Trạng giao dịch
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ngày mua
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr class="bg-white border-y border-[#e8e8e8]">
                <th scope="row" class="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">
                #1
                </th>
                <td class="px-6 py-4">
                Công Cương
                </td>
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
            <tr class="bg-white border-y border-[#e8e8e8]">
                <th scope="row" class="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">
                #2
                </th>
                <td class="px-6 py-4">
                Công Cương
                </td>
                <td class="px-6 py-4">
                Responsive Với Grid System
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
                #3
                </th>
                <td class="px-6 py-4">
                Đăng Khoa
                </td>
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
                #4
                </th>
                <td class="px-6 py-4">
                Quốc Hưng111
                </td>
                <td class="px-6 py-4">
                Responsive Với Grid System
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
            <tr class="bg-white border-y border-[#e8e8e8]">
                <th scope="row" class="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">
                #5
                </th>
                <td class="px-6 py-4">
                Cương
                </td>
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
        </>
    );
};
