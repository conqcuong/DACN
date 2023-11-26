import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Login } from "./components/layout/Login";
import { HomePage } from "./pages/HomePage";

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </Router>
        <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </>
  )
}

export default App
