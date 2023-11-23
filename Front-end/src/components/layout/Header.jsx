import React from 'react'
import logo from '../../assets/imgs/f8-icon.png'
import { FaLightbulb } from "react-icons/fa6";
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
        <div className='navbar__wrapper' id='header'>
            <div className='navbar__logo'>
                <Link className='flex' to='/'><img src={logo} /></Link>
                <h4 className='text-14px font-bold ml-4'>Học Lập Trình Để Đi Làm</h4>
            </div>
            <div className='navbar__body d-flex-center'>
                <div>
                    <div className='search__wrapper d-flex-center'>
                        <div className='search__searchIcon'></div>
                        <input className='search__input' spellCheck="false" aria-expanded="false" placeholder="Tìm kiếm khóa học, bài viết, video, ..."/>
                    </div>
                </div>
            </div>
            <div className='navbar_actions'>
                <div>
                    <button className='navbar__myLearn' aria-expanded="false">Khóa học của tôi</button>
                </div>
                <div>
                    <div className="action_icon cursor-pointer relative mt-[3px] sm:px-3 sm:py-2 sm:mt-0">
                        <FaLightbulb className="hover:opacity-100 svg-inline--fa opacity-70" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
