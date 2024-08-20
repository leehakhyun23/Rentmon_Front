import React, { useEffect, useState } from 'react'

function MyInfoCommonent({name, content, setFunction , userdata}) {
  let [isopen, setIsopen] = useState(false);
  let [istrue, setIstrue] = useState(false);
  let [data,setData] =useState({});
  let [message, setMessage] = useState("");
  useEffect(()=>{
    if(userdata.dname!=="password") setData(content);
    else setData();
  },[content]);

  useEffect(()=>{
    if(userdata.dname ==='name'){
      if(data !== "")setIstrue(true);
      else setIstrue(false);
    }
    if(userdata.dname==="phone"){
      const regex = /^(?:\+82|0)[1-9][0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
      if(data && regex.test(data)){
        setMessage("");
        setIstrue(true);
      }else if(data){
        setMessage("* 전화번호 형식에 맞게 작성 해주세요.");
        setIstrue(false);
      }else{
        setMessage("");
      }
    }
    
    if(userdata.dname ==='password'){
      const regex = /^(?=.*[A-Za-z])(?=.*\d|.*[^A-Za-z0-9])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$|^(?=.*\d)(?=.*[A-Za-z]|.*[^A-Za-z0-9])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$|^(?=.*[^A-Za-z0-9])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;
      if(data && regex.test(data)){
        setMessage("");
        setIstrue(true);
      }else if(data){
        setMessage("* 비밀번호 형식에 맞게 작성해주세요.");
        setIstrue(false);
      }else{
        setMessage("");
      }
    }
  },[data]);
  return (
    <>
      <div  className='row'>
          <div className='name'>{name}</div>
          <div className='content'>{content}</div>
          <button onClick={()=>{
              if(isopen) setIsopen(false) 
              else  setIsopen(true)
            }}>{(!isopen)?("변경하기"):("취소")}</button>
      </div>
      {isopen&&(
        <div className=''>
          <div className='row'>
            <input type={(userdata.dname==="password")?('password'):('text')} name={userdata.dname} value={data || ''} onChange={(e)=>{setData(e.currentTarget.value)}}/>
            <div className='updateButtonwrap'>
              <button className={`updateButton ${(!istrue)&&("noactive")}`} onClick={()=>{
                setFunction(userdata.url, userdata.dname , data);
                setIsopen(false);
                }}>수정</button>
            </div>
          </div>
          <div>
              <p>{message}</p>
              {(userdata.dname === "phone")&&(<span>- 010을 시작으로 하이픈(-)을 사용하여 작성해주세요.</span>)}
              {(userdata.dname === "password")&&(<span>- 문자/숫자/특수문자 중 2가지 이상 조합 (8~30자)</span>)}
          </div>
        </div>
      )}
    </>
  )
}

export default MyInfoCommonent
