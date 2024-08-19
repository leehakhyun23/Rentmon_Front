import React from 'react'

function UsedCouponComponent({num,title , lastDate , useyn}) {
  return (
    <div>
        <div className='num'>{num}</div>
        <div className='title'>{title}</div>
        <div className='lastDate'>{lastDate}</div>
        <div className='useyn'>{(typeof useyn !== 'string')?((useyn)?("미사용"):("사용")):(useyn)}</div>
    </div>
  )
}

export default UsedCouponComponent
