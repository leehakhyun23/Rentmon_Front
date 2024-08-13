import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

function IdCheck({setInfo}) {
  const [userid , setUserid] = useState("");
  const [idcheck ,setIdcehck] = useState(false);
  const [resultid ,setResultid] = useState(false);
  const [message ,setMessage] = useState("");
  
  useEffect(()=>{
    if(userid !== "") setIdcehck(true);
    else setIdcehck(false);
  },[userid]);

  useEffect(()=>{
    if(resultid) setInfo(prev=>({...prev, userid}));
    else setInfo(prev=>({...prev, userid:""}));
  },[resultid]);

  const checkUserid =  useCallback(async ()=>{
    try{
      let result = await axios.post("/api/user/join/idcheck", null, {params:{userid}});
      if(result.data == false){
        setMessage("* 사용가능한 아이디입니다.");
        setResultid(true);
      }else{
        setMessage("* 이미 존재하는 아이디입니다.");
        setResultid(false);
      }
    }catch(err){
      console.error(err);
    }
  },[userid]);

  const useridChange = (e)=>{
    setUserid(e.target.value);
    setIdcehck(false);
    setResultid(false);
    setMessage("");
  }

  return (
    <div className='field'>
        <div>
            <input type="text" name='userid' placeholder='아이디' value={userid} onChange={(e)=>{useridChange(e);}}/>
            <button className={`checkbutton ${idcheck?"active":""}`} onClick={checkUserid}>중복 확인</button>
        </div>
        {
          (message !=="") &&(<p className={(resultid)?"good":""}>{message}</p>)
        }
        
    </div>
  )
}

export default IdCheck
