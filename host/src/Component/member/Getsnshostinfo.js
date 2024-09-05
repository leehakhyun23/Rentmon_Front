import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loginAction } from '../../store/HostSlice';
import { setCookie } from '../../util/cookieUtil';
import jaxios from '../../util/jwtUtil';

function Getsnshostinfo() {
  const {hostid,provider} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{ snsLogin();},[]);

    // const API_KEY = 'aded7a236492c4b574347a7dc6f3a1db';
    // const city = "Seoul";
    // let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;

    let snsLogin=async()=>{
        let usernameWithRole =hostid+":host";
        let result = await axios.post("/api/member/login",null,{params:{usernameWithRole,password:provider}});
        
        if(result.data.error === "ERROR_LOGIN"){
            return alert("로그인 실패 관리자에게 문의");
        }
        setCookie("token",{accessToken:result.data.accessToken , refreshToken : result.data.refreshToken},1);

        //회원 정보 조회
        let logindata = await jaxios.get("/api/host/gethostinfo",{params:{hostid:result.data.userid}});
        dispatch(loginAction(logindata.data));
        if(!logindata.data){
          return alert("로그인 실패 관리자에게 문의");
        }
        
        alert("로그인 완료됐습니다.");
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

export default Getsnshostinfo
