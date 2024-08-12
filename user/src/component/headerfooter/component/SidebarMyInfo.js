import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutRecentRerveAction } from '../../../store/RecentSlice';
import { logoutAction } from '../../../store/UserSlice';

function SidebarMyInfo({username}) {
  let dispatch=useDispatch();
  function logoutFunction(){
    dispatch(logoutAction())
    dispatch(logoutRecentRerveAction())
  }
  return (
    <div className='userinfo'>
      <div className='profileImg'>
        <img src='/img/no_profileimg.png' alt='no_profileimg.png'/>
      </div>
      <div className='textbox'>
        <div className='text'>안녕하세요. {username}님</div>
        <p onClick={logoutFunction}>로그아웃</p>
      </div>
    </div>
  )
}

export default SidebarMyInfo
