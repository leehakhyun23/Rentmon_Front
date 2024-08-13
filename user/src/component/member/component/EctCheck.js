import React, { useEffect, useState } from 'react'

function EctCheck({setInfo}) {
  const [name , setName] = useState("");
  const [phone , setPhone] = useState("");
  const [message, setMessage] = useState("");
  const regex = /^(?:\+82|0)[1-9][0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
  
  useEffect(()=>{
    if(phone && regex.test(phone)){
      phoneinput("" , phone);
    }else if(phone){
      phoneinput("* 전화번호 형식에 맞게 작성 해주세요." , "");
    }else{
      phoneinput("" , "");
    }
  },[phone]);
 

  useEffect(()=>{
    setInfo(perv=>({...perv, name}));
  },[name]);

  function phoneinput(text , phone){
    setInfo(perv=>({...perv, phone}));
    setMessage(text);
  }
  return (
    <div className='field ectinfo'>
        <input type="text" name="name1" onChange={(e)=>{setName(e.currentTarget.value)}} value={name} placeholder='이름' />
        <input type="text" name="phone" onChange={(e)=>{setPhone(e.currentTarget.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z]/g, ''))}} value={phone} placeholder='전화번호' />
        <span>- 010/02/+82와 하이픈(-)을 사용하여 작성해주세요.</span>
        <p>{message}</p>
    </div>
  )
}

export default EctCheck
