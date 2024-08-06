import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userid , setUserid] = useState("");
    const [pwd , setPwd] = useState("");
    const navigate = useNavigate();

    let onLogin = async()=>{
       try{
            let usernameWithRole =userid+":user";
            let result = await axios.post("/api/member/login",null,{params:{usernameWithRole,password:pwd}});
            
            if(result.data.error == "ERROR_LOGIN"){
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
    <div>
        아이디 : <br/>
      <input type="text" name="userid" value={userid} onChange={
        (e)=>{setUserid(e.currentTarget.value)}
      } /><br/>
      비밀번호 : <br/>
      <input type="text" name="pwd"  value={pwd} onChange={
        (e)=>{setPwd(e.currentTarget.value)}
      }  /><br/>
      <button onClick={onLogin}>로그인</button>
    </div>
  )
}

export default Login
