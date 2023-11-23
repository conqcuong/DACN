import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Header } from "./components/layout/Header";

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Header/>} />
          </Routes>
        </Router>
        <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
    </>
  )
}

export default App
