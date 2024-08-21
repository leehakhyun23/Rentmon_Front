import axios from 'axios';
import { async } from 'q';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import jaxios from '../../util/jwtUtil';

function ResetPasswordUrl() {
    const {userid} = useParams();
    const [message , setMessage] = useState("");

    const [password, setPassword] = useState("");
    const [pwdcheck, setPwdcheck] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const navigate = useNavigate();

    const regex = /^(?=.*[A-Za-z])(?=.*\d|.*[^A-Za-z0-9])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$|^(?=.*\d)(?=.*[A-Za-z]|.*[^A-Za-z0-9])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$|^(?=.*[^A-Za-z0-9])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;


    
    useEffect(()=>{
        setPasswordcheck(false);
        
        if(password && !regex.test(password)){
        return setMessage("* 비밀번호 조합을 확인해주세요.");
        }else if(regex.test(password) && pwdcheck !== password ){
        return setMessage("* 비밀번호 체크가 동일하지 않습니다.");
        }else if(regex.test(password) && pwdcheck === password){
        setPasswordcheck(true);
        return setMessage("* 사용가능한 비밀번호 입니다.");
        }
        return setMessage("");
    },[password, pwdcheck]);


    const onSubmit = async()=>{
        try{
            let data={
                password, userid
            }
            let result = await axios.post("/api/main/changePassword",data);
            if(result.data == "ok"){
                alert("비밀번호 변경에 성공했습니다. 로그인해주세요.");
                navigate("/login");
            }
        }catch(err){console.log(err)}
    }

    return (
    <div className='innerContainer pwdCeck'>
        <h2>비밀번호 재설정</h2>
        <input type="password" placeholder='비밀번호' value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}}/>
        <input type="password" placeholder='비밀번호 확인' value={pwdcheck} onChange={(e)=>{setPwdcheck(e.currentTarget.value)}}/>
        <span className={(passwordcheck)?("msg ok"):("msg")}>{message}</span>
        <div className='explain'>
            <p>- 문자/숫자/특수문자 중 2가지 이상 조합 (8~30자)</p>
        </div>
        <button className={`checkbutton ${(passwordcheck)?"active":""}`} onClick={onSubmit} >변경하기</button>
    </div>
    )
}

export default ResetPasswordUrl
