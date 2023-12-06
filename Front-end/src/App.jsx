import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import {
    NotFound,
    Login,
    Register,
    HomePage,
    LibraryCoursePage,
    CreateCoursePage,
    CourseDetailPage,
    CreateLessonPage,
    LeesonPage
} from "./Routes"
// import { VideoPlayer } from "./test/VideoPlayer";
import { Test } from "./test/Test";
// import { Comment } from "./components/layout/Comment";

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/library' element={<LibraryCoursePage/>} />
            <Route path='/course/create' element={<CreateCoursePage/>} />
            <Route path='/course/:id' element={<CourseDetailPage/>} />
            <Route path='/course/lesson/create' element={<CreateLessonPage/>} />
            <Route path='/course/lesson/:id' element={<LeesonPage/>} />
            {/* <Route path='/test' element={<VideoPlayer/>} /> */}
            <Route path='/test1' element={<Test/>} />
            <Route path='*' element={<NotFound/>} />
            {/* <Route path='/cmt' element={<Comment/>} /> */}
          </Routes>
        </Router>
        <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </>
  )
}

export default App
