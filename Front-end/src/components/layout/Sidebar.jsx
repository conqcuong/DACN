import React, { useRef, useState, useEffect } from 'react';
import {FaRoad, FaPen, FaPlus, FaHouse, FaRocketchat} from 'react-icons/fa6'
import {NavLink, Link} from"react-router-dom";

export const Sidebar = () => {
    // Ẩn hiện create post
    const toggleClass = () => {
        setOpen(!open);
   };
   // Ẩn hiện Post
   const [open, setOpen] = useState(false);
   const menuRef = useRef();
   const imgRef = useRef();

   useEffect(() => {
       const handleWindowClick = (e) => {
           if (!menuRef.current?.contains(e.target) && !imgRef.current?.contains(e.target)) {
               setOpen(false);
           }
       };
       window.addEventListener('click', handleWindowClick);
       return () => {
           window.removeEventListener('click', handleWindowClick);
       };
   }, []);
   /**/
  return (
    <>
        <div className='flex items-center flex-col px-2 sticky top-[74px] z-[8] w-[96px]'>
            <div>
                <div className="group flex justify-center items-center w-[44px] h-[44px] mt-2 mb-0.5 rounded-full bg-[#1473e6] border-[#1473e6] cursor-pointer" ref={imgRef} onClick={() => { toggleClass(); setOpen(!open); }} >
                    <FaPlus className={`text-[#fff] transition-transform duration-300 ease-in-out group-hover:scale-150 ${open ? 'transform rotate-45 scale-150 transition-transform duration-300 ease-in-out' : ''}`} />
                </div>
                    {
                        // Open Post
                        open &&
                        <div ref={menuRef} className='absolute z-9999 m-0 top-0 right-auto bottom-auto left-0 translate-y-[62px] translate-x-[26px]'>
                            <ul className='min-w-[200px] bg-[#fff] shadow-2xl py-2 rounded-[10px]'>
                                <li><Link className='block py-2 px-5 text-[#444] hover:bg-[#f0f0f0] hover:text-[#292929]'><em className='inline-block w-[16px]'><FaPen/></em><span className='ml-4 text-[14px]'>Viết Blog</span></Link></li>
                            </ul>
                        </div>
                    } 
            </div>
            <ul className='my-2.5'>
                <li><NavLink className='flex items-center justify-center rounded-2xl flex-col h-[72px] w-[72px] mt-1 hover:bg-[#f5f5f5]' to="/"><FaHouse className='w-5 h-5 text-[#404040]'/><span className='text-[11px] font-semibold mt-1 text-[#404040]'>Trang chủ</span></NavLink></li> 
                <li><NavLink className='flex items-center justify-center rounded-2xl flex-col h-[72px] w-[72px] mt-1 hover:bg-[#f5f5f5]' to="/library"><FaRoad className='w-5 h-5 text-[#404040]'/><span className='text-[11px] font-semibold mt-1 text-[#404040]'>Lộ trình</span></NavLink></li>
                <li><NavLink className='flex items-center justify-center rounded-2xl flex-col h-[72px] w-[72px] mt-1 hover:bg-[#f5f5f5]' to='/course/15'><FaRocketchat className='w-5 h-5 text-[#404040]'/><span className='text-[11px] font-semibold mt-1 text-[#404040]'>Chat</span></NavLink></li>
            </ul>
        </div>
    </>
  )
}
