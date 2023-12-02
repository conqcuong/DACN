import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/imgs/Logo_9.jpg";
import { FaLightbulb } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { navlist } from "../../static/data";
import { logOutUser, saveOutUser, getAllCourses, profileUser, getAllLessons } from "../../redux/apiRequest";
import { FaBell, FaBars, FaChevronLeft} from "react-icons/fa6";

export const Header = () => {
    // Quay lại
    const currentLocation = useLocation();
    // Lấy token để lấy dữ liễu người dùng
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    //Truyền dữ liệu khi vào trang
    useEffect(() => {
        const fetchData = async () => {
          try {
            await getAllCourses(dispatch);
            await getAllLessons(dispatch);
            if (token !== null && typeof token === 'string' && token !== '') {
                await profileUser(token, dispatch);
            } else {
                console.log('Token is null or empty.'); // Xử lý khi token không có giá trị hoặc là chuỗi rỗng
            }
          } catch (err) {
            console.error(err);
            // Xử lý lỗi khi gọi các hàm
          }
        };
        fetchData();
      }, [dispatch, token]); 
    // Get User Login
    const user = useSelector((state) => state.auth.login.currentUser);
    // search
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    useEffect(() => {
        fetch("http://localhost:8889/product/getall")
        .then((res) => res.json())
        .then((data) => {
            setFilterData(data);
        })
        .catch((err) => console.log(err));
    }, []);
    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        const filteredData = filterData.filter((item) =>
        item.name.toLowerCase().includes(value)
        );
        setInputValue(value);
        setShowSearchResults(value.length > 0);
        setData(filteredData);
        if (value === "") {
            setData([]);
         }
    };
    // Ẩn hiện profile
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const imgRef = useRef();
    useEffect(() => {
        const handleWindowClick = (e) => {
        if (
            !menuRef.current?.contains(e.target) &&
            !imgRef.current?.contains(e.target)
        ) {
            setOpen(false);
        }
    };
        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);
    // Ẩn hiện Menu Khóa học
    const [opencourse, setOpencourse] = useState(false);
    const courseRef = useRef();
    const btnCourseRef = useRef();
    useEffect(() => {
        const handleWindowClick = (e) => {
            if (
                !courseRef.current?.contains(e.target) &&
                !btnCourseRef.current?.contains(e.target)
            ) {
                setOpencourse(false);
            }
        };
        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);
    // // Xử lý form đăng nhập đăng ký
    // const [iframeSrc, setIframeSrc] = useState("/login");
    // const [showModal, setShowModal] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleLoginClick = () => {
    //     setShowModal(true);
    //     setIframeSrc("/login");
    // };

    // const handleRegisterClick = () => {
    //     setShowModal(true);
    //     setIframeSrc("/register");
    // };

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };

    // const handleLoginSuccess = () => {
    //     setIsLoggedIn(true);
    //     setShowModal(false); // Ẩn modal khi đăng nhập thành công
    //     // Hiển thị thông báo trên trang home hoặc thực hiện hành động cần thiết khi login thành công
    // };

    // const handleReceiveMessage = (event) => {
    //     if (event.data === "loginSuccess") {
    //         handleLoginSuccess(); // Xử lý khi đăng nhập thành công từ iframe
    //     }
    // };

    // // Thêm sự kiện lắng nghe thông điệp từ iframe
    // useEffect(() => {
    //     window.addEventListener("message", handleReceiveMessage);
    //     return () => {
    //         window.removeEventListener("message", handleReceiveMessage);
    //     };
    // }, []);

    // // Ấn ra ngoài sẽ ẩn form đăng nhập đăng ký
    // const handleOverlayClick = (e) => {
    //     if (e.target.classList.contains("authModal__overlay")) {
    //         handleCloseModal();
    //     }
    // };
    // // Đăng ký sự kiện lắng nghe từ iframe
    // window.addEventListener('message', (event) => {
    //     if (event.data.type === 'loginSuccess') {
    //         const userData = event.data.data;
    //         // Lưu userData vào store của cửa sổ cha ở đây
    //         console.log('User data:', userData); // dispatch action để lưu dữ liệu vào store
    //         let a = 0;
    //         a= a+1
    //         console.log(a)
    //         saveOutUser(dispatch, userData);
    //         setShowModal(false);
    //     }
    // });
    // // console.log(user)

  // LogOut
    const navigate = useNavigate();
    const handleLogout = () => {
        logOutUser(dispatch, navigate);
        // setShowModal(true);
        // setIframeSrc("/login");    
    };
    
  return (
    <>
        <div className="navbar" id="header">
            {/* LOGO */}
            <div className="hidden flex-[1] lg:flex">
                <Link to='/'><img className="w-9.5 rounded-lg object-contain shrink-0" src={logo}  /></Link>
                {currentLocation.pathname === '/' ? (
                    <h4 className="font-bold ml-4 self-center">Học Lập Trình Để Đi Làm</h4>
                ) : (
                    <Link className="group flex" to="/"><h4 className="flex ml-4 mt-[10px] text-[#808990] text-12px font-semibold uppercase">
                    <FaChevronLeft className="mr-1 mt-1 text-[10px] transition duration-300 ease-in-out group-hover:-translate-x-1"/><span>Quay lại</span></h4></Link>
                )}
            </div>
            {/* Body */}
            <div className="navbar__body d-flex-center">
                <div className="relative">
                    <div className="search__wrapper d-flex-center">
                        <div className="search__searchIcon"></div>
                        <input className="search__input" spellCheck="false" aria-expanded="false" placeholder="Tìm kiếm khóa học, bài viết, video, ..." type="search" onChange={handleFilter} />
                    </div>
                    {setInputValue && showSearchResults && (
                        <div className="z-9999 inset-0 absolute transform translate-x-[0] translate-y-[50px]">
                            <ul>
                                <div className="search__result">
                                    <div><span>{`Kết quả cho '${inputValue}'`}</span></div>
                                    <div className="flex items-center justify-between mb-1.5 pt-6 pb-3 border-b border-solid border-opacity-25">
                                        <h5 className="font-medium text-14px text-text-color">KHÓA HỌC</h5>
                                    </div>
                                    {data.map((d, i) => (
                                        <Link key={i} to={`/course/details/${d.id}`} className="flex items-center py-1.5">
                                            <div className="text-[3.6px] rounded-full">
                                                <img className="w-[32.4px] h-[32.4px] object-cover rounded-full" src={d.apiimage}/>
                                             </div>
                                            <span className="line-clamp-2 text-14px ml-3 text-[#292929] ">{d.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* Action */}
            <div className="navbar__actions">
            {/* Khi không có user trong store thì sẽ có đăng nhập, đăng ký - có user trong store thì có các Actions */}
            {user ? (
            <>
                <div className="relative">
                    <button className="navbar__myLearn" aria-expanded="false" ref={courseRef}onClick={() => setOpencourse(!opencourse)}>Khóa học của tôi</button>
                    {opencourse && (
                        <div className="absolute z-9999 inset-0 transform translate-x-[-240px] translate-y-[40px]">
                            <ul className="shadow-2xl bg-white rounded-[10px] animate-nav_ani min-w-[360px] pb-3">
                                <div className="flex items-center pt-3.5 pb-4 px-5">
                                    <h6 className="text-[18px] font-semibold">Khóa học của tôi</h6>
                                </div>
                                <div className="max-h-[68vh] overflow-y-auto ">
                                    <div className="flex mx-2 px-3 py-2 transition duration-300 ease-in-out hover:bg-gray-300">
                                        <Link><img className="block text-center min-h-[67px] w-[120px] rounded-lg" src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"alt=""/></Link>
                                        <div className="ml-3 flex-1">
                                            <h3 className="text-14px mt-1.5 font-semibold">Kiến thức nhập môn IT</h3>
                                            <Link className="block text-14px mt-1.5 font-semibold text-primary-color">Bắt đầu học</Link>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    <div className="cursor-pointer relative mt-[3px] sm:px-3 sm:py-2 sm:mt-0">
                        <FaLightbulb className="hover:opacity-100 svg-inline--fa opacity-70" />
                    </div>
                </div>
                {/* avatar User */}
                <div className="hidden ml-4 lg:block" ref={imgRef} onClick={() => setOpen(!open)}>
                    <img className="rounded-full h-[28.79px] w-[28.79px] hover:cursor-pointer" src={user.avatar}/>
                </div>
                {
                    // Menu Profile User
                    open && (
                    <div className="absolute z-9999 m-0 top-0 right-0 bottom-auto left-auto transform translate-x-[-27.3333px] translate-y-[57.3333px]">
                        <ul className="navbar__ul">
                            <div className="flex">
                                <div className="my-2.5 relative">
                                    <div>
                                        <img className="rounded-full h-[50.4px] w-[50.4px]" src={user.avatar}/>
                                    </div>
                                </div>
                                <div className="ml-3 self-center">
                                    <span className="font-semibold text-[#292929] text-16px">{user.username}</span>
                                    <div className="text-text-color-light">{user.email}</div>
                                </div>
                            </div>
                            {navlist.map((nav, i) => (
                                <li key={i}>
                                    {i === 2 || i === 5 ? null : (
                                    <hr className="border-t my-2 border-[rgba(0,0,0,.05)]" />
                                )}
                                    <Link className="block py-2 text-gray-color hover:text-[#292929]" to={nav.path} >{nav.text}</Link>
                                </li>
                            ))}
                            <li className="block py-2" onClick={handleLogout}>
                                <Link className="text-gray-color hover:text-[#292929]">Đăng xuất</Link>
                            </li>
                        </ul>
                    </div>
                    )
                }
            </>
          ) : (
            <> 
                {/* onClick={handleLoginClick}
                onClick={handleRegisterClick} */}
                <Link to='/login'>
                    <button className="text-black font-semibold mr-8" >Đăng nhập</button>
                </Link>
                <Link to='/register'>
                    <button className="font-semibold text-white bg-gradient-to-r from-orange-500 to-[#ff5117] rounded-[99px] py-[9px] px-5 hover:opacity-90"> Đăng ký</button>
                </Link>
            </>
        )}
            </div>
        </div>
        {/* Modal */}
        {/* {showModal && (
        <div className="authModal">
            <div className="authModal__overlay" onClick={handleOverlayClick}></div>
            <div className="authModal__content">
                <button className="authModal__close" onClick={handleCloseModal}><span className="mt-[-4px]">×</span></button>
                <iframe className="authModal__iframe border-none h-full w-full" src={iframeSrc} onLoad={() => { const iframe = document.querySelector(".authModal__iframe");
                iframe.contentWindow.postMessage("loginSuccess", "*");}}
                ></iframe>
            </div>
        </div>
        )} */}
    </>
  );
};
