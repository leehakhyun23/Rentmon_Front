import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EctCheck from './component/EctCheck'
import EmailCheck from './component/EmailCheck'
import IdCheck from './component/IdCheck'
import ImageCheck from './component/ImageCheck'
import PwdCheck from './component/PwdCheck'
import "./css/login.css"

function JoinForm() {
    const [oksubmit, setOksubmit] = useState(false);
    const navigate = useNavigate();
    const [message , setMessage] = useState("");
    const [info, setInfo] = useState({
        userid:"",
        password:"",
        name:"",
        phone:"",
        email:"",
        profileimg:""
    });

    //빈칸체쿠
    useEffect(()=>{
        setOksubmit(true);
        setMessage("");
        for(let key of Object.keys(info)){
            if(key === "profileimg") return false;
            if(!info[key]){
                setOksubmit(false);
                if(key === "userid") setMessage("* 아이디 입력 또는 중복확인을 확인해주세요.");
                if(key === "password") setMessage("* 비밀번호 입력 또는 체크를 확인해주세요.");
                if(key === "name") setMessage("* 이름 입력을 확인해주세요.");
                if(key === "phone") setMessage("* 전화번호 입력을 확인해주세요.");
                if(key === "email") setMessage("* 이메일 입력 또는 이메일 인증을 확인해주세요.");
                break;
            } 
        };
    },[info]);

    //조인함수
    let onSubmit = useCallback(async()=>{
        try {
            let formData = new FormData();
            formData.append("userid", info.userid);
            formData.append("password",info.password);
            formData.append("name",info.name);
            formData.append("phone",info.phone);
            formData.append("email",info.email);
            if (info.profileimg) {
                formData.append("profileimg", info.profileimg);
              }

            try{
                let result = await axios.post("/api/user/join",formData);
                navigate("/choosecategory/"+result.data);
            }catch(err){
                console.error(err);
            }
        }catch(err){
            console.error(err);
        }
    },[oksubmit]);

  return (
    <div className='innerContainer '>
        <div className='joinform'>
            <h2>LOGIN</h2>
            <IdCheck setInfo={setInfo} />  
            <PwdCheck setInfo={setInfo} />
            <EctCheck setInfo={setInfo}  />
            <EmailCheck setInfo={setInfo} />
            <ImageCheck setInfo={setInfo}  />
            <div className='nextJoin'>
                <button className={(oksubmit)?("active"):("")} onClick={onSubmit}>다음으로</button>
                <p>{message}</p>
            </div>
        </div>
    </div>
  )
}

export default JoinForm
