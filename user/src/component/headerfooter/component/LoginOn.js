import React, { useEffect, useState } from 'react'
import MyInfo from './MyInfo';
import RecentReservation from './RecentReservation'
import SidebarMyInfo from './SidebarMyInfo'

function LoginOn() {
  const [recentReservationData , setRecentReservationData] = useState({});
  useEffect(()=>{
    setRecentReservationData({
      savefilename : "/img/placeimg.png",
      title:"A스튜디오",
      count : 3,
      reservedate : "2024-08-06T03:01:48.000+00:00"
    })
  },[]);
  return (
    <div className='logOn scrollbar'>
      {/* 상위 내정보 */}
      <SidebarMyInfo username = {"김민주"} />
      <RecentReservation rs={recentReservationData}/>
      <MyInfo/>
    </div>
  )
}

export default LoginOn
