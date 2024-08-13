import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCookie, setCookie } from '../../util/cookieUtil';
import jaxios from '../../util/jwtUtil';
import { loginAction } from '../../store/HostSlice';

import '../css/login.css'


function Login() {
  const [hostid, setHostid] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginMessage , setLoginMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let onLogin = async () => {
    try {
      let usernameWithRole = hostid + ":host";
      let result = await axios.post("/api/member/login", null, { params: { usernameWithRole, password: pwd } });
console.log(result);
      if (result.data.error === "ERROR_LOGIN") {
        return setLoginMessage("아이디 또는 비밀번호를 확인해주세요.");
      } else {
        setCookie("token",{accessToken:result.data.accessToken , refreshToken : result.data.refreshToken},1);

        //회원 정보 조회
        let logindata = await jaxios.get("/api/host/gethostinfo",{params:{userid:result.data.userid}});
        dispatch(loginAction(logindata.data));

        // //최근 예약 조회
        // let recentrerve = await jaxios.get("/api/space/getreserve",{params:{hostid:hostid}});
        // console.log( recentrerve.data);
        // dispatch(recentReserveAction({recentReserve: recentrerve.data}));

        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <article>
      <div className='loginheader'>
        <div className='logo1'>호스트 로그인</div>
        <div className='left'></div>
      </div>
      <div className='loginForm'>
        <div className='text1'>호스트 로그인</div>
        <div className='text2'>호스트센터를 이용하시려면 별도의 호스트 회원가입이 필요합니다.</div> <br />
        <div className='form'>
          <div className="sns-btns">
            <a href="http://localhost:8070/host/sns/kakaostart">Kakao Login</a>
            <a href="http://localhost:8070/host/sns/naverstart">Naver Login</a>
            <a href="http://localhost:8070/host/sns/googlestart">Google Login</a>
            <div className='or'>또는</div>
            <input type="text" name="hostid" value={hostid} onChange={
              (e) => { setHostid(e.currentTarget.value) }
            } placeholder='호스트 아이디' /><br />
            <input type="password" name="pwd" value={pwd} onChange={
              (e) => { setPwd(e.currentTarget.value) }
            } placeholder='비밀번호' /><br />
            <div className='alertmessage'><p>{loginMessage}</p></div>
            <button className='loginbtn' onClick={() => { onLogin() }}>로그인</button>
            <div className='join'>
              <div className='jointext'>아직 렌트몬 호스트가 아니신가요?</div>
              <div className='joinbtn' onClick={() => { navigate('/Join') }}>호스트 회원가입</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Login
