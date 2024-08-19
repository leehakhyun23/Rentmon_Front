import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import UsedCoupon from './Component/UsedCoupon';
import WillUseCoupon from './Component/WillUseCoupon'

function Coupon() {
  const user = useSelector(state=>state.user);
  const {currentPage} = useParams();
  return (
    <div className=' mypagecommon'>
      <WillUseCoupon userid = {user.userid} />
      <UsedCoupon userid={user.userid} />
    </div>
  )
}

export default Coupon
