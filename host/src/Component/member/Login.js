import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/login.css'


function Login() {
    const [hostid , setHostid] = useState("");
    const [pwd , setPwd] = useState("");
    const navigate = useNavigate();

    let onLogin = async()=>{
       try{

            let hostnameWithRole =hostid+":host";
            let result = await axios.post("/api/host/login",null,{params:{hostnameWithRole,password:pwd}});
            
            if(result.data.error === "ERROR_LOGIN"){
              return alert(result.data.error+"이메일 또는 패드스워드 오류입니다.");
            }else{
              console.log(result.data);
              navigate("/Main");
            }

       }catch(err){
            console.error(err);
       }
    }

  return (
    <article>
      <div className='header'>
        <div className='logo1'>호스트 로그인</div>
        <div className='left'></div>
      </div>
      <div className='loginForm'>
        <div className='text1'>호스트 로그인</div>
        <div className='text2'>호스트센터를 이용하시려면 별도의 호스트 회원가입이 필요합니다.</div> <br />
        <div className='form'>
        <div className="sns-btns">
                        <button onClick={
                            ()=>{
                                window.location.href='http://localhost:8070/host/kakaostart';
                            }
                        }>Kakao Login</button>
                        <button>Naver Login</button>
                        <button>Google Login</button>
                        <div className='or'>또는</div>
      <input type="text" name="hostid" value={hostid} onChange={
        (e)=>{setHostid(e.currentTarget.value)}
      } placeholder='호스트 아이디'/><br/>
      <input type="text" name="pwd"  value={pwd} onChange={
        (e)=>{setPwd(e.currentTarget.value)}
      } placeholder='비밀번호'/><br/>
      <button className='loginbtn' onClick={()=>{onLogin()}}>로그인</button>
      <div className='join'>
        <div className='jointext'>아직 렌트몬 호스트가 아니신가요?</div>
        <div className='joinbtn' onClick={()=>{navigate('/Join')}}>호스트 회원가입</div>
      </div>
    </div>
    </div>
    </div>
    </article>
  )
}

export default Login
