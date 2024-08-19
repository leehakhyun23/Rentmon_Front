import React, { useEffect, useState } from 'react'

function CardNum({cardnum,setcardnum}) {
    const [message,setMessage]=  useState("");
    const [cardnumber, setCartnumber]= useState("");
    useEffect(()=>{
        let carnumpattern = /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/;
        if(cardnumber && !carnumpattern.test(cardnumber)){
            setcardnum("");
            setMessage("* 카드번호 입력 형식을 확인헤 주세요.");
        }else if(carnumpattern.test(cardnumber)){
            setcardnum(cardnumber);
            setMessage("");
        }else{ 
            setcardnum("");
            setMessage("");
         }
    },[cardnumber])
  return (
    <div className='cardInput'>
      <span>카드 번호</span>
      <input type="text" value={cardnumber} onChange={(e)=>{setCartnumber(e.currentTarget.value)}} placeholder="카드번호" />
      <p>* "0000-0000-0000-0000" 또는 "0000 0000 0000 0000" 형식으로 작성 해주세요.</p>
      <span>{message}</span>
    </div>
  )
}

export default CardNum
