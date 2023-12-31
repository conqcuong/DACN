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
    QuizPage,
    VideoLivePage,
    LearningpathPage,
    OrderHistoryPage,
    EditCoursePage,
    Order,
    CreateCourseStream
    // Product,
} from "./Routes"
// import { TestAd } from "./test/TestAd";
import { Test3 } from "./test/Test3";
import { TestCourse } from "./test/TestCourse";
import { TestLive } from "./test/TestLive";

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
              <Route path='pay' element={<Order />} />
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
            <Route path='quiz' element={<QuizPage/>} />
            <Route path='video' element={<VideoLivePage/>} />
            <Route path='/learningpath' element={<LearningpathPage/>} />
            <Route path='/orderhistory' element={<OrderHistoryPage/>} />
            <Route path='/test' element={<TestLive/>} />
            <Route path="/course2" element={<TestCourse/>} />
            {/* Chỉ cho Admin và Teach */}
            <Route path='/library' element={userCanAccess ? <LibraryCoursePage /> : <NotFound />} />
            <Route path='/course/:id' element={ userCanAccess ? <CourseDetailPage /> : <NotFound />} />
            <Route path='/course/create' element={ userCanAccess ? <CreateCoursePage /> : <NotFound />} />
            <Route path='/course/lesson/create' element={ userCanAccess ? <CreateLessonPage /> : <NotFound />} />
            <Route path='/course/edit/:id' element={ userCanAccess ? <EditCoursePage /> : <NotFound />} />
            <Route path='/course/stream/create' element={ userCanAccess ? <CreateCourseStream /> : <NotFound />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </Router>
        <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </>
  )
}

export default App
