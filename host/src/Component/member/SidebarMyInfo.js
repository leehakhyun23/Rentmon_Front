import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/HostSlice';
import LogoutButton from './LogoutButton';

function SidebarMyInfo({username}) {
  let dispatch=useDispatch();
  function logoutFunction(){
    dispatch(logoutAction())
  }
  return (
    <div className='userinfo'>
      <div className='profileImg'>
      </div>
      <div className='textbox'>
        <div className='text'>안녕하세요. {username}님</div>
      </div>
      </div>
  )
}

export default SidebarMyInfo
