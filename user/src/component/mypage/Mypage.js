import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { logoutAction } from '../../store/UserSlice';
import InfoDashBoard from './Component/InfoDashBoard'
import "./css/mypage.css"

function Mypage() {
  let user = useSelector(state => state.user);
  let recent =useSelector(state => state.recent);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(()=>{
    if(!user.name){
      dispatch(logoutAction())
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  },[user]);

  return (
    <div className='innerContainer mypage'>
      <InfoDashBoard user={user} menucount={recent.menucount}/>
      <Outlet />
    </div>
  )
}

export default Mypage
