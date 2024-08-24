import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logoutRecentRerveAction } from '../../store/RecentSlice';
import { logoutAction } from '../../store/UserSlice';

function LoguoutAction() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(logoutAction());
        dispatch(logoutRecentRerveAction());
        navigate("/");
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default LoguoutAction
