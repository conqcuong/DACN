import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Sidebar } from '../components/layout/Sidebar'
import img_card from '../assets/imgs/fb-group-cards.png'
import front_card from '../assets/imgs/front-template.png'
import back_card from '../assets/imgs/back-template.png'
import { Link } from 'react-router-dom'

export const LearningpathPage = () => {
  return (
    <>
        <Header/>
        <div className='flex min-h-screen '>
            <div className='hidden shrink-0 lg:block'>
                <Sidebar/>
            </div>
            <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4'>
                <section className='w-full max-w-[1920px] p-0 mx-auto'>
                    <div className='pb-12 lg:px-11 lg:pt-2 lg:mb-15'>  
                        <div className='mb-12 lg:mb-20'>
                            <h1 className='text-#242424 text-[28px] font-black lg:my-[18.760px]'>Lộ trình học</h1>
                            <div className='break-words text-[#292929] text-15px max-w-[840px]'><p className='my-1.5'>Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".</p></div>
                        </div>
                        <div className='container_body'>
                            <div className='learningPathsList_content'>
                                <div className='learningPathItem_wrapper'>
                                    <div className='learningPathItem_body'>
                                        <div className='learningPathItem_info'>
                                            <h2 className='learningPathItem_title'><a href="/">Lộ trình học Front-end</a></h2>
                                            <p className='learningPathItem_desc'>
                                                Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
                                            </p>
                                        </div>
                                        <div className='learningPathItem_thumb-wrap'>
                                            <Link ><img src={front_card} alt="" /></Link>
                                        </div>
                                    </div>
                                    <div className='learningPathItem_cta'>
                                        <div className="circular-wrapper">
                                            <div className="circularProgressBar_shadow"></div>
                                            <div className="circularProgressBar_body">
                                                <Link>
                                                    <img src="/src/assets/img/users/avt.jpg" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link className='common_btn btn_primary'>Xem chi tiết</Link>
                                    </div>
                                </div>
                                <div className='learningPathItem_wrapper'>
                                    <div className='learningPathItem_body'>
                                        <div className='learningPathItem_info'>
                                            <h2 className='learningPathItem_title'><Link>Lộ trình học Back-end</Link></h2>
                                            <p className='learningPathItem_desc'>
                                                Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.
                                            </p>
                                        </div>
                                        <div className='learningPathItem_thumb-wrap'>
                                            <Link><img src={back_card} alt="" /></Link>
                                        </div>
                                    </div>
                                    <div className='learningPathItem_cta'>
                                        <div className="circular-wrapper">
                                            <div className="circularProgressBar_shadow"></div>
                                            <div className="circularProgressBar_body">
                                                <Link >
                                                    <img src="/src/assets/img/users/avt.jpg" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link className='common_btn btn_primary'>Xem chi tiết</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='suggestionBox_wrapper'>
                                <div className='suggestionBox_info'>
                                    <h2>Tham gia cộng đồng học viên F8 trên Facebook</h2>
                                    <p>Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.</p>
                                    <Link className='info_btn'>Tham gia nhóm</Link>
                                </div>
                                <div className='suggestionBox_image'>
                                    <img src={img_card} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Footer/>
    </>
  )
}