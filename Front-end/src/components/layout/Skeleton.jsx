import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const CardSkeleton = () => {
  return (
    <div className='card-skeleton'>
        <div className='left-col'>
            <Skeleton circle height={40} width={40} />
        </div>
        <div className='right-col'>
            <Skeleton/>
        </div>
    </div>
  )
}
