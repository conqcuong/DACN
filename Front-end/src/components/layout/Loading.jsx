import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <>
        <div className='flex justify-center items-center h-[100vh] bg-[#f0f0f0]'>
            <CircularProgress />
        </div>
    </>
  )
}
