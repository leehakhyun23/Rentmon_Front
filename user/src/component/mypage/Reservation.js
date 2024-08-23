import { async } from 'q';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReserveInfo } from '../../util/getreser';
import RecentReservation from './Component/RecentReservation'
import ReservationList from './Component/ReservationList'

function Reservation() {
  const user = useSelector(state => state.user);
  let dispatch = useDispatch();

  useEffect(()=>{
    getReserveInfo(user.userid, dispatch);
  },[]);

 
  return (
    <div className='mypagecommon'>
      <RecentReservation/>
      <ReservationList/>
    </div>
  )
}

export default Reservation
