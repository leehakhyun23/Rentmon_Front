import React, { useEffect, useState } from 'react'

function PwdCheck({setInfo}) {
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");
  const [message , setMessage] = useState("");
  const [pwdcheck ,setPwdcheck] = useState(false);

  const regex = /^(?=.*[A-Za-z])(?=.*\d|.*[^A-Za-z0-9])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$|^(?=.*\d)(?=.*[A-Za-z]|.*[^A-Za-z0-9])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$|^(?=.*[^A-Za-z0-9])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;


  useEffect(()=>{
    setPwdcheck(false);
    if(password && !regex.test(password)){
      return setMessage("* 비밀번호 조합을 확인해주세요.");
    }else if(regex.test(password) && passwordcheck !== password ){
      return setMessage("* 비밀번호 체크가 동일하지 않습니다.");
    }else if(regex.test(password) && passwordcheck === password){
      setInfo(prev => ({...prev , password}));
      setPwdcheck(true);
      return setMessage("* 사용가능한 비밀번호 입니다.");
    }
    setInfo(prev => ({...prev , password:""}))
    return setMessage("");
  },[password, passwordcheck]);

  return (
    <div className='field password'>
        <input type="password" name='password' placeholder='비밀번호' value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} />
        <input type="password" name='passwordcheck' placeholder='비밀번호 체크' value={passwordcheck} onChange={(e)=>{setPasswordcheck(e.currentTarget.value)}} />
        <span>- 문자/숫자/특수문자 중 2가지 이상 조합 (8~30자)</span>
        <p className={(pwdcheck)?"good":""}>{message}</p>
    </div>
  )
}

export default PwdCheck
