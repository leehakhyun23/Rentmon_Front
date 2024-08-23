import React from 'react'
import RecentReservation from './Component/RecentReservation'
import ReservaionCalender from './Component/ReservaionCalender'

function DashBoard() {
  return (
    <div className='dashboard mypagecommon'>
      <RecentReservation/>
      <ReservaionCalender />
    </div>
  )
}

export default DashBoard
