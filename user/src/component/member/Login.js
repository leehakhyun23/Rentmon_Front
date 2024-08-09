import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { recentReserveAction } from '../../store/RecentSlice';
import { loginAction } from '../../store/UserSlice';
import { getCookie, setCookie } from '../../util/cookieUtil';
import jaxios from '../../util/jwtUtil';
import "./css/login.css"

function Login() {
    const [userid , setUserid] = useState("");
    const [pwd , setPwd] = useState("");
    const [loginMessage , setLoginMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let onLogin = async()=>{
       try{

            let usernameWithRole =userid+":user";
            let result = await axios.post("/api/member/login",null,{params:{usernameWithRole,password:pwd}});
            
            if(result.data.error === "ERROR_LOGIN"){
              return setLoginMessage("* 아이디 또는 비밀번호를 확인해주세요.");
            }else{
              setCookie("token",{accessToken:result.data.accessToken , refreshToken : result.data.refreshToken},1);

              //회원 정보 조회
              let logindata = await jaxios.get("/api/user/getuseinfo",{params:{userid:result.data.userid}});
              dispatch(loginAction(logindata.data));

              //최근 예약 조회
              let recentrerve = await jaxios.get("/api/space/getreserve",{params:{userid:userid}});
              console.log( recentrerve.data);
              dispatch(recentReserveAction({recentReserve: recentrerve.data}));

              navigate("/");
            }

       }catch(err){
            console.error(err);
       }
    }

  return (
    <div className='loginContainer'>
      <div className='leftLogo pc'>
          <h2>RENTMON</h2>
      </div>
      <div className='loginform'>
          <div>
            <h2>LOGIN</h2>
            <input type="text" name="userid" value={userid} onChange={(e)=>{setUserid(e.currentTarget.value)}} placeholder="아이디" />
            <input type="password" name="pwd"  value={pwd} onChange={(e)=>{setPwd(e.currentTarget.value)}} placeholder="비밀번호"  /><br/>
            <div className='alertmessage'><p>{loginMessage}</p></div>
            <button onClick={onLogin}>로그인</button>
            <div className='joinbox'><Link to="/join">일반 회원가입</Link></div>
            <div className='snsLogin'>
                <span>SNS 로그인</span>
                <div className='snsbtncontainer'>
                  <Link to=""><img src='/img/google.png' alt='google'/></Link>
                  <Link to=""><img src='/img/kakao.png' alt='kakao'/></Link>
                  <Link to=""><img src='/img/naver.png' alt='naver' /></Link>
                </div>
            </div>
          </div>
      </div>
       
    </div>
  )
}

export default Login
