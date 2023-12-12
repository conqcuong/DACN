import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import {useSelector} from "react-redux";
import {
    NotFound,
    Login,
    Register,
    HomePage,
    LibraryCoursePage,
    CreateCoursePage,
    CourseDetailPage,
    CreateLessonPage,
    LeesonPage,
    ChatPage,
    CoursePage,
    PaySuccess,
    EditProfilePage,
    DashboardPage,
    Home,
    User,
    // Product,
} from "./Routes"
import { Test } from "./test/Test";
import { TestVideo } from "./test/TestVideo";
// import { TestAd } from "./test/TestAd";

function App() {
  const userRole = useSelector((state) => state.auth.login.currentUser?.role);
  const role = userRole ? userRole.toLowerCase() : '';
  const userCanAccess = role === 'teach' || userRole === 'admin'; // Xác định quyền truy cập
  return (
    <>
      <Router>
          <Routes>
            {/* Chỉ cho User */}
            <Route path='/dashboard' element={<DashboardPage/>}>
              <Route index element={<Home />} />
              <Route path='user' element={<User />} />
              {/* <Route path='product' element={<Product />} /> */}
            </Route>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/course/details/:id' element={<CoursePage/>} />
            <Route path='/course/lesson/:id' element={<LeesonPage/>} />
            <Route path='/chat' element={<ChatPage/>} />
            <Route path='/paymentsuccess' element={<PaySuccess/>} />
            <Route path='/editprofile' element={<EditProfilePage/>} />
            <Route path='/test' element={<Test/>} />
            <Route path='/test1/:id' element={<TestVideo/>} />
            {/* <Route path='/test2' element={<TestAd/>} /> */}
            {/* Chỉ cho Admin và Teach */}
            <Route path='/library' element={userCanAccess ? <LibraryCoursePage /> : <NotFound />} />
            <Route path='/course/:id' element={ userCanAccess ? <CourseDetailPage /> : <NotFound />} />
            <Route path='/course/create' element={ userCanAccess ? <CreateCoursePage /> : <NotFound />} />
            <Route path='/course/lesson/create' element={ userCanAccess ? <CreateLessonPage /> : <NotFound />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </Router>
        <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </>
  )
}

export default App
