import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getAllCourses } from "../../redux/apiRequest";

export const Order = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const courses = useSelector((state)=> state.course.listCourses); 
    const listUsers = useSelector((state)=> state.user.listUsers); 
    // console.log(user)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:9002/api/v1/GetAll`);
            const datas = await response.json();
            await getAllUsers(dispatch);
            await getAllCourses(dispatch);
            setData(datas)
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        } catch (err) {
            console.error(err);
            // Xử lý lỗi khi gọi các hàm
          }
        };
        fetchData();
    }, [dispatch]); 

    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        // Format lại ngày và tháng nếu cần thiết để có dạng 'dd/mm/yyyy'
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}/${formattedMonth}/${year}`;
    };
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
                        {
                            data.map((item, index) => {
                                const formattedDate = convertDateFormat(item.day);
                                const course = courses.find((course) => course.id === item.productid);
                                const user = listUsers.find((user) => user.id === item.accountid);
                                if(course && user && formattedDate){
                                    return(
                                        <tr key={item.id} className="bg-white border-y border-[#e8e8e8]">
                                            <th scope="row" className="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">#{item.id}</th>
                                            <td className="px-6 py-4">{user.fullname}</td>
                                            <td className="px-6 py-4">{course.name}</td>
                                            <td className="px-6 py-4">{(item.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                            <td className="px-6 py-4">Thành công</td>
                                            <td className="px-6 py-4">{formattedDate}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};
