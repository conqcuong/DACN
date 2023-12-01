import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import {
    NotFound,
    Login,
    Register,
    HomePage,
    LibraryCoursePage,
    CreateCoursePage
} from "./Routes"

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
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </Router>
        <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </>
  )
}

export default App
