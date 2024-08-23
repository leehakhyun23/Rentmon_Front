import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../store/UserSlice';
import jaxios from '../../util/jwtUtil';
import MyInfoUpdate from './Component/MyInfoUpdate';
import MyInterest from './Component/MyInterest';
import UdateFormLeft from './Component/UdateFormLeft';

import "./css/updateUser.css";

function Updateuser() {
    const [joindata , setJoindata] = useState({
        station:"",
        category:[],
    }); 
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log(user);
    },[user]);

    const updateUser = async()=>{
        let logindata = await jaxios.get("/api/user/getuseinfo",{params:{userid:user.userid}});
        dispatch(loginAction(logindata.data));
    }
  return (
    <div className='mypagecommon'>
      <div className='title'>
            <h2>정보 수정</h2>
        </div>
        <div className='updateForm'>
            <div className='left'>
                <UdateFormLeft user={user} updateUser={updateUser}/>
            </div>
            <div className='right'>
                <MyInterest user={user} updateUser={updateUser}/>
                <MyInfoUpdate user={user} updateUser={updateUser} />
            </div>
        </div>
    </div>
  )
}

export default Updateuser
