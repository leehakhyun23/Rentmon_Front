import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import jaxios from '../../../util/jwtUtil';
import MyInfo from './MyInfo';
import RecentReservation from './RecentReservation'
import SidebarMyInfo from './SidebarMyInfo'

function LoginOn() {
  let user = useSelector(state => state.user);
  let recent =useSelector(state => state.recent);
  const [recentReservationData , setRecentReservationData] = useState({});
  useEffect(() => {
    if (!recent.recentReserve) return;
    let recentrv = recent.recentReserve;
    setRecentReservationData({
      savefilename: recentrv.spaceimage[0]?.realname || '',
      title: recentrv.space?.title || '',
      count: recentrv.space?.personnal || 0,
      reservedate: recentrv.reservestart || ''
    });
  }, [recent]); 
  return (
    <div className='logOn scrollbar'>
      {/* 상위 내정보 */}
      <SidebarMyInfo username = {user.name} />
      <RecentReservation rs={recentReservationData}/>
      <MyInfo/>
    </div>
  )
}

export default LoginOn
