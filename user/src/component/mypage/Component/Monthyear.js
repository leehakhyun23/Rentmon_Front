import React, { useEffect, useState } from 'react'

function Monthyear({monthyear , setMonthyear}) {
    const [message,setMessage]=  useState("");
    const [my, setMy]= useState("");

    useEffect(()=>{
        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if(my && !expiryPattern.test(my)){
            setMonthyear("");
            setMessage("* CVC 입력 형식을 확인헤 주세요.");
        }else if(expiryPattern.test(my)){
            setMonthyear(my);
            setMessage("");
        }else{ 
            setMonthyear("");
            setMessage("");
         }
    },[my]);
  return (
    <div className='cardInput'>
        <span>유효 기간</span>
        <input type="text" value={my} onChange={(e)=>{setMy(e.currentTarget.value)}} placeholder="CVC" />
        <p>* "MM/YY" 형식으로 작성 해주세요.</p>
        <span>{message}</span>
    </div>
  )
}

export default Monthyear
