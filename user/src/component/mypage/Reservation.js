import React from 'react'
import RecentReservation from './Component/RecentReservation'
import ReservationList from './Component/ReservationList'

function Reservation() {
  return (
    <div className='mypagecommon'>
      <RecentReservation/>
      <ReservationList/>
    </div>
  )
}

export default Reservation
