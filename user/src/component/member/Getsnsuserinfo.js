import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { recentReserveAction, weatherSetAction } from '../../store/RecentSlice';
import { loginAction } from '../../store/UserSlice';
import { setCookie } from '../../util/cookieUtil';
import { getReserveInfo } from '../../util/getreser';
import jaxios from '../../util/jwtUtil';
import "./css/loading.css";

function Getsnsuserinfo() {
    const {userid,provider} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{ snsLogin();},[]);


    let snsLogin=async()=>{
        let usernameWithRole =userid+":user";
        let result = await axios.post("/api/member/login",null,{params:{usernameWithRole,password:provider}});
        
        if(result.data.error === "ERROR_LOGIN"){
            return alert("로그인 실패 관리자에게 문의");
        }
        setCookie("token",{accessToken:result.data.accessToken , refreshToken : result.data.refreshToken},1);
        //회원 정보 조회
        let logindata = await jaxios.get("/api/user/getuseinfo",{params:{userid}});
        if(!logindata.data.islogin){
                alert("사용할 수 없는 계정입니다.");
                return navigate("/login");
              }
              dispatch(loginAction(logindata.data));
              if(!logindata.data){
                return alert("로그인 실패 관리자에게 문의");
              }
              
              getReserveInfo(userid, dispatch);

              navigate("/");

    }
  return (
    <div className='lodingContainer innerContainer'>
      <h2>회원 조회 중</h2>
      <p>조금만 기다려주세요!</p>
      <div className='box'>
        <div className='loader10'></div>
      </div>
    </div>
  )
}

export default Getsnsuserinfo
