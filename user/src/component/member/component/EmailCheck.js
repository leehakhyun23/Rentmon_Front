import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getCookie, removeCookie, setAuthoCookie } from '../../../util/cookieUtil';

function EmailCheck({setInfo}) {
  const [email, setEmail] = useState("");
  const [code , setCode] = useState("");
  const [codeOpne , setCodeOpne] = useState({display:"none"});
  const [ebtn , setEbtn] = useState(false);
  const [timer , setTimer] = useState(""); 
  const [message , setMessage] = useState("");
  const [emailcheck ,setEmailcheck] = useState(false);
  const intervalRef = useRef(null);

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(()=>{
    if(regex.test(email)){
      setEbtn(true);
    }else{
      setEbtn(false);
    }
  },[email]);


  const sendMail=async()=>{
    try{
      removeCookie("emailCode");
      setCodeOpne({display:"block"});
      startTimer();
      setEmailcheck(false);
      let result = await axios.post("/api/user/join/mailsend",null,{params:{email}});
      setAuthoCookie("emailCode", result.data , 5);
    }catch(err){
      console.error(err);
    }
  };

  function startTimer() {
    clearInterval(intervalRef.current);
    let time = 300; 
    intervalRef.current = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        setTimer( `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        if (time === 0) {
          clearInterval(intervalRef.current);
        }
        time--;
        
    }, 1000);
  }

  function codeCehck(){
    let authoCode = getCookie("emailCode");
    if(code == authoCode){
      setTimer("");
      clearInterval(intervalRef.current);
      setMessage("* 인증이 완료되었습니다.");
      setInfo(prev=>({...prev, email}));
      setEmailcheck(true);
    }else{
      setMessage("* 인증코드 유효시간이 완료되었거나 인증코드가 틀립니다.");
      setInfo(prev=>({...prev, email:""}));
      setEmailcheck(false);
    }
  }

 
  return (
    <div className='field emailContaienr'>
        <div className='emailput'>
            <input type="text" placeholder='이메일' name='email' value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
            <button className={`checkbutton ${(ebtn)?"active":""}`} onClick={sendMail} >코드 전송</button>
        </div>
        <div className='emailcheck' style={codeOpne}>
            <div>
                <input type="text" placeholder='인증 코드' name='code' value={code} onChange={(e)=>{setCode(e.currentTarget.value)}}/>
                <span className='timer'>{timer}</span>
            </div>
            <button className={`checkbutton ${code ? "active" :""}`} onClick={codeCehck}>제출</button>
        </div>
        <p className={(emailcheck)?"good":""}>{message}</p>
    </div>
  )
}

export default EmailCheck
