import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <>
      <div className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
        <div className='flex justify-center items-center bg-white rounded-lg p-8'>
          <CircularProgress />
        </div>
      </div>
    </>
  )
}
