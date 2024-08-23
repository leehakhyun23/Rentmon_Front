import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRecentRerveAction } from '../../../store/RecentSlice';
import { logoutAction } from '../../../store/UserSlice';
import { getReserveInfo } from '../../../util/getreser';
import MyInfo from './MyInfo';
import RecentReservation from './RecentReservation'
import SidebarMyInfo from './SidebarMyInfo'

function LoginOn({mypagePopup , setMypagePopup}) {
  let user = useSelector(state => state.user);
  let recent =useSelector(state => state.recent);
  let dispatch = useDispatch();
  const [recentReservationData , setRecentReservationData] = useState({});
  useEffect(() => {
    if (!recent.recentReserve) return;
    let recentrv = recent.recentReserve;
    setRecentReservationData({
      savefilename: recentrv.space.spaceimage[0]?.realName || '',
      title: recentrv.space?.title || '',
      count: recentrv.space?.maxpersonnal || 0,
      reservedate: recentrv.reservestart || '',
      reserveend: recentrv.reserveend || '',
      weather : recent.weather || "",
    });
  }, [recent]); 

  useEffect(()=>{
    
    getReserveInfo(user.userid, dispatch);
  },[])
  return (
    <div className='logOn scrollbar'>
      {/* 상위 내정보 */}
      <SidebarMyInfo username = {user.name} profileimg={user.profileimg} setMypagePopup={setMypagePopup} />
      <RecentReservation rs={recentReservationData} setMypagePopup={setMypagePopup}/>
      <MyInfo mypagePopup={mypagePopup} user={user} setMypagePopup={setMypagePopup}/>
    </div>
  )
}

export default LoginOn
