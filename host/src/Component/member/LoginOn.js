import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import MyInfo from './MyInfo';
// import RecentReservation from './RecentReservation'
// import SidebarMyInfo from './SidebarMyInfo'
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/HostSlice';
import { removeCookie } from '../../util/cookieUtil';
import SidebarMyInfo from './SidebarMyInfo';
import '../css/header.css';


function LoginOn() {
    const navigate = useNavigate(); 
    // const isLoggedIn = true;
    const dispatch = useDispatch();
    const host = useSelector(state => state.host);
    const isLoggedIn = Boolean(host.hostid);

  
  
    function onLogout(){
      dispatch( logoutAction() );
      removeCookie("host");
      navigate('/main'); 
  }

  return (
    <div className='logOn scrollbar'>
      {/* 상위 내정보 */}
      {/* <RecentReservation rs={recentReservationData}/> */}
          {isLoggedIn ? (
               <div className='header-content'>
               <SidebarMyInfo className="sidebar-info" username={host.nickname} />
               <LogoutButton onLogout={onLogout} className='logoutbtn' />
           </div>
            ) : (
                <button onClick={() => navigate('/login')} className='loginbtn' >로그인</button>
            )}
    </div>
  )
}

export default LoginOn
