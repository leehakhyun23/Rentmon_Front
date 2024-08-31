import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { logoutRecentRerveAction } from '../../../store/RecentSlice';
import { logoutAction } from '../../../store/UserSlice';

function SidebarMyInfo({username,profileimg , setMypagePopup}) {
  let dispatch=useDispatch();
  function logoutFunction(){
    dispatch(logoutAction())
    dispatch(logoutRecentRerveAction())
  }
  return (
    <div className='userinfo'>
      <div className='profileImg'>
        {(profileimg)?(<img src={`http://localhost:8070/profile_images/${profileimg}`} alt={profileimg}/>):<img src='/img/no_profileimg.png' alt='no_profileimg.png'/>}
      </div>
      <div className='textbox'>
        <div className='text'><Link to="/mypage/dashboard" onClick={()=>{setMypagePopup(false)}}>안녕하세요. {username}님 <img src='/img/goiconwhite.svg' alt='goiconwhite.svg'/></Link></div>
        <p onClick={logoutFunction}>로그아웃</p>
      </div>
    </div>
  )
}

export default SidebarMyInfo
