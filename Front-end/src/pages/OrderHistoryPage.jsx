import React, {useEffect, useState} from 'react'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { Footer } from '../components/layout/Footer'
import { useDispatch, useSelector } from 'react-redux'

export const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const courses = useSelector((state)=> state.course.listCourses); 
    const userId = useSelector((state) => state.auth.login.currentUser?.id);
    console.log(data)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:9000/api/v1/findbyaccountid/${userId}`);
            const datas = await response.json();
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
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-[#e8e8e8]">
                            <table className="w-full text-sm text-left rtl:text-right text-black">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Mã đơn hàng</th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">Tên Khóa học</div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">Giá</div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">Tình trạng</div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">Ngày mua</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>   
                                {
                                    data.map((item, index) => {
                                        const formattedDate = convertDateFormat(item.day);
                                        const course = courses.find(
                                            (course) => course.id === item.productid
                                        );
                                        if(course){
                                            return(
                                                <tr key={item.id} className="bg-white border-y border-[#e8e8e8]">
                                                    <th scope="row" className="px-6 py-4 font-medium text-[#292929] whitespace-nowrap">#{item.id}</th>
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
                    </div>
                </section>
            </div>
        </div>
        <Footer />
    </>
  )
}
