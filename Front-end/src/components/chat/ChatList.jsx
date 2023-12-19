import React, { useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {getPayMent} from '../../redux/apiRequest'
// import { ChatContent } from './ChatContent'

export const ChatList = ({ setSelectedItem }) => {
    const user = useSelector((state) => state.auth.login.currentUser); // Thông tin User
    const userId = user?.id; // ID người dùng
    const listCourse = useSelector((state) => state.course.listCourses); // Danh sách bài học
    const listUser = useSelector((state) => state.userCourse.listPayCourse); // Danh sách người dùng
    const productIdList = listUser.map(user => user.productId); // Danh sách ID sản phẩm của người dùng
    // Lọc danh sách các khóa học có productId giống với productIdList
    const listPayCourse = listCourse.filter(course => productIdList.includes(course.id));
    // console.log(listPayCourse);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getPayMent(dispatch, userId);    
            } catch (err) {
                console.error(err);
                // Xử lý lỗi khi gọi các hàm
            }
        };
        fetchData();
    }, [dispatch]); 

      
  return (
    <>
        <div className='pr-4 border-r border-gray-200 bg-[#f4f3f8] pl-5 h-screen'>
            <div className='flex justify-between items-center'>
                <h2 className='text-[24px] font-black my-5'>Chats</h2>
            </div>
            <div className='bg-white rounded-xl'>
                <div className="flex items-center justify-center h-10 border-2 border-solid border-gray-300 rounded-xl pl-2 pr-4 focus-within:border-search">
                    <div className="search_icon hover:opacity-100"></div>
                    <input className="h-full w-[150px] px-1 flex-[1] placeholder-gray-400 outline-none" type="search" spellCheck="false" placeholder="Tìm kiếm ..." />
                </div>
            </div>
            <div className='mt-7 overflow-auto max-h-[710px] mb-5'>
                {/* Chat List */}
                {
                    listPayCourse && listPayCourse.map((items, index) =>(
                        <Link key={items.id} onClick={() => setSelectedItem(items)}>
                            <div className={`py-2.5 pr-2.5 pl-5 flex bg-white rounded-xl ${index > 0 ? 'mt-3' : ''}`}>
                                <div className='w-10 h-10 rounded-full mr-5 relative'>
                                    <div className='overflow-hidden rounded-full w-full h-full'>
                                        <img className='w-full h-full object-cover' src={items.apiimage} alt="" />
                                    </div>
                                </div>
                                <div className='text-14px flex'>
                                    <div className='w-[150px]'>
                                        <p className='font-semibold line-clamp-1'>{items.name}</p>
                                        <span className='line-clamp-2'>I'm taliking about the tutorial</span>
                                    </div>
                                    <span className='font-semibold text-14px mr-2'>9:36</span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
        {/* <ChatContent chatId={setSelectedItem} /> */}
    </>
  )
}
