import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { recentReserveAction, weatherSetAction } from '../../store/RecentSlice';
import { loginAction } from '../../store/UserSlice';
import { setCookie } from '../../util/cookieUtil';
import jaxios from '../../util/jwtUtil';
import "./css/loading.css";

function Getsnsuserinfo() {
    const {userid,provider} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{ snsLogin();},[]);

    const API_KEY = 'aded7a236492c4b574347a7dc6f3a1db';
    const city = "Seoul";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;

    let snsLogin=async()=>{
        let usernameWithRole =userid+":user";
        let result = await axios.post("/api/member/login",null,{params:{usernameWithRole,password:provider}});
        
        if(result.data.error === "ERROR_LOGIN"){
            return alert("로그인 실패 관리자에게 문의");
        }
        setCookie("token",{accessToken:result.data.accessToken , refreshToken : result.data.refreshToken},1);

              //회원 정보 조회
              let logindata = await jaxios.get("/api/user/getuseinfo",{params:{userid:result.data.userid}});
              dispatch(loginAction(logindata.data));
              if(!logindata.data){
                return alert("로그인 실패 관리자에게 문의");
              }

              //최근 예약 조회
              let recentrerve = await jaxios.get("/api/space/getreserve",{params:{userid:result.data.userid}});
              
              //최근 예약에 날씨 데이터 삽입
              if(recentrerve.data){
                dispatch(recentReserveAction({recentReserve: recentrerve.data}));
                fetchForecast();
              }
      
              async function fetchForecast() {
                try {
                  let response = await fetch(url);
                  let data = await response.json();
                  displayForecast(data);
                } catch (error) {
                  console.error('날씨 예보 정보를 가져오는데 실패했습니다.', error);
                }
              }
    
              function displayForecast(data) {
                data.list.forEach(item => {
                  if( !item.dt_txt.includes(recentrerve.data.reservestart.split(" ")[0]+" 21:00:00")) return false;
                  dispatch(weatherSetAction({weather:{
                    temp : item.main.temp,
                    description:item.weather[0].description,
                    icon :`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                  }}));
                 
                });
              }
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
