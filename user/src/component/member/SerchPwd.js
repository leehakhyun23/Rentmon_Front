import axios from 'axios';
import { async } from 'q';
import React, { useEffect, useState } from 'react'

function SerchPwd() {
    const [email, setEmail] = useState("");
    const [userid, setUserid] = useState("");
    const [ebtn , setEbtn] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(()=>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(userid && regex.test(email)){
          setEbtn(true);
        }else{
          setEbtn(false);
        }
    },[email, userid]);

    const onSubmit = async()=>{
        try{
            let resetPasswordUrl = "http://localhost:3000/resetPasswordUrl/"+userid;
            let result = await axios.post("/api/main/searchPwd",null,{params:{userid, email ,resetPasswordUrl}});
            setMessage(result.data);
            document.querySelector(".messageani").classList.add("on");
            setTimeout(()=>{
                document.querySelector(".messageani").classList.remove("on");
            },3000);
        }catch(err){console.log(err)}
    }
    return (
        <div className='innerContainer pwdCeck'>
        <h2>비밀번호 찾기</h2>
        <input type="text" placeholder='아이디' value={userid} onChange={(e)=>{setUserid(e.currentTarget.value)}}/>
        <input type="text" placeholder='이메일' value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
        <span className="messageani">{message}</span>
        <div className='explain'>
            <p>- 가입 시 사용한 아이디와 이메일 주소를 입력해주시면 비밀번호 재설정 링크를 보내드립니다.</p>
            <p>- 네이버, 카카오로 가입하신 경우 비밀번호 찾기가 불가합니다.</p>
        </div>
        <button className={`checkbutton ${(ebtn)?"active":""}`} onClick={onSubmit} >비밀번호 재설정 링크 보내기</button>
        </div>
    )
}

export default SerchPwd
