import React, { useEffect, useState } from 'react'

function Cvc({cvc, setCvc}) {
    const [message,setMessage]=  useState("");
    const [cvcnumber, setCvcnumber]= useState("");

    useEffect(()=>{
        const cvcPattern = /^\d{3,4}$/;
        if(cvcnumber && !cvcPattern.test(cvcnumber)){
            setCvc("");
            setMessage("* CVC 입력 형식을 확인헤 주세요.");
        }else if(cvcPattern.test(cvcnumber)){
            setCvc(cvcnumber);
            setMessage("");
        }else{ 
            setCvc("");
            setMessage("");
         }
    },[cvcnumber]);
  return (
    <div className='cardInput'>
        <span>CVC 번호</span>
        <input type="text" value={cvcnumber} onChange={(e)=>{setCvcnumber(e.currentTarget.value)}} placeholder="CVC" />
        <p>* 3자리 또는 4자리 숫자 형식으로 작성 해주세요.</p>
        <span>{message}</span>
  </div>
  )
}

export default Cvc
