import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import InfoDashBoard from './Component/InfoDashBoard'
import "./css/mypage.css"

function Mypage() {
  let user = useSelector(state => state.user);
  let recent =useSelector(state => state.recent);
  return (
    <div className='innerContainer'>
      <InfoDashBoard user={user} menucount={recent.menucount}/>
      <Outlet />
    </div>
  )
}

export default Mypage
