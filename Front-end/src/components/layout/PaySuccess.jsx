import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export const PaySuccess = () => {
  const location = useLocation();
  // Đường dẫn URL hiện tại sẽ nằm trong location.pathname
  console.log('Đường dẫn URL hiện tại:', location.pathname);
  return (
    <>
        <div className="bg-gray-100 h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="bg-white p-6 md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
          </path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Thành công!</h3>
          <p className="text-gray-600 my-2">Đơn hàng đã thanh toán thành công.</p>
          <p> Cảm ơn!  </p>
          <div className="py-10 text-center">
            <Link to='/' className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">Quay lại</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
