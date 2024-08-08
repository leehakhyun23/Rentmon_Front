import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../HeaderFooter/Header';
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
              navigate("/");
            }

       }catch(err){
            console.error(err);
       }
    }

  return (
    <article>
        <Header />
    <div>
      <h1>호스트 로그인</h1>
      <h3>호스트센터를 이용하시려면 별도의 호스트 회원가입이 필요합니다.</h3> <br />
      <div className="sns-btns">
                        <button onClick={
                            ()=>{
                                window.location.href='http://localhost:3000/host/kakaostart';
                            }
                        }>Kakao Login</button>
                        <button>Naver Login</button>
                        <button>Google Login</button>
        아이디 : <br/>
      <input type="text" name="hostid" value={hostid} onChange={
        (e)=>{setHostid(e.currentTarget.value)}
      } /><br/>
      비밀번호 : <br/>
      <input type="text" name="pwd"  value={pwd} onChange={
        (e)=>{setPwd(e.currentTarget.value)}
      }  /><br/>
      <button onClick={onLogin}>로그인</button>
      <button>회원가입</button>
    </div>
    </div>
    </article>
  )
}

export default Login
