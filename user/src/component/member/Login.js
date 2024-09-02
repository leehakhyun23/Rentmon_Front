import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { recentReserveAction, weatherSetAction } from '../../store/RecentSlice';
import { loginAction } from '../../store/UserSlice';
import { setCookie } from '../../util/cookieUtil';
import { getReserveInfo } from '../../util/getreser';
import jaxios from '../../util/jwtUtil';
import "./css/login.css"

function Login() {
    const [userid , setUserid] = useState("");
    const [pwd , setPwd] = useState("");
    const [loginMessage , setLoginMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);

    useEffect(()=>{
      if(user.userid){
        alert("이미 로그인 하셨습니다.");
        navigate("/");
      }
    },[]);

    let onLogin = async()=>{
       try{
            if(!userid) return setLoginMessage("* 아이디를 입력해주세요.");
            if(!pwd) return setLoginMessage("* 비밀먼호를 입력해주세요.");
            let usernameWithRole =userid+":user";
            let result = await axios.post("/api/member/login",null,{params:{usernameWithRole,password:pwd}});
            
            if(result.data.error === "ERROR_LOGIN"){
              return setLoginMessage("* 아이디 또는 비밀번호를 확인해주세요.");
            }else{
              
              setCookie("token",{accessToken:result.data.accessToken , refreshToken : result.data.refreshToken},1);
              
              //회원 정보 조회
              let logindata = await jaxios.get("/api/user/getuseinfo",{params:{userid}});
              if(!logindata.data.islogin){
                alert("사용할 수 없는 계정입니다.");
                return navigate("/login");
              }
              dispatch(loginAction(logindata.data));
              if(!logindata.data){
                return setLoginMessage("* 관리자에게 문의해주세요.");
              }

              getReserveInfo(userid, dispatch);
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
            <div className='pwdSearch'><Link to="/serchPwd">비밀번호 찾기</Link></div>
            <div className='alertmessage'><p>{loginMessage}</p></div>
            <button onClick={onLogin}>로그인</button>
            <div className='joinbox'><Link to="/join">일반 회원가입</Link></div>
            <div className='snsLogin'>
                <span>SNS 로그인</span>
                <div className='snsbtncontainer'>
                  <a href="http://13.125.67.78/api/user/sns/googlestart"><img src='/img/google.png' alt='google'/></a>
                  <a href="http://13.125.67.78/api/user/sns/kakaostart"><img src='/img/kakao.png' alt='kakao'/></a>
                  <a href="http://13.125.67.78/api/user/sns/naverstart"><img src='/img/naver.png' alt='naver' /></a>
                </div>
            </div>
          </div>
      </div>
       
    </div>
  )
}

export default Login
