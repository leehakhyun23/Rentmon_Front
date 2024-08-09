import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/join.css'

function Join() {

    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pwdChk, setPwdChk ] = useState('');




    const navigate = useNavigate();

    async function onSubmit(){
        if(name==''){ return alert('이름을 입력하세요');}
        if(email==''){ return alert('이메일을 입력하세요');}
        if(phone==''){ return alert('전화번호를 입력하세요');}
        if(pwd==''){ return alert('패스워드를 입력하세요');}
        if(pwd!==pwdChk){ return alert('패스워드 확인이 일치하지 않습니다');}

        try{
            let result = await axios.post('/api/host/join', {email, pwd, name, phone});
            if(result.data.msg=='ok'){
                alert('회원 가입이 완료되었습니다. 로그인하세요');
                navigate('/');
            }
        }catch(err){
            console.error(err);
        }
    }



    return (
        <article>
            <div className='header'>
                <div className="logo1">호스트 회원가입</div>
                <div className='left'>

                </div>
            </div>
        <div className='joinform'>
            <div className='field'>
                <input type="text"  value={name} onChange={
                    (e)=>{ setName( e.currentTarget.value ) }
                } placeholder='이름'/>
             <div className='field'>
                <input type="text" value={email} onChange={
                    (e)=>{ setEmail( e.currentTarget.value ) }
                } placeholder='이메일'/>
         </div>
            <div className='field'>
                <input type="text" value={phone} onChange={
                    (e)=>{ setPhone( e.currentTarget.value ) }
                } placeholder='전화번호'/>
            </div>
            <div className='field'>
                <input type="password" value={pwd} onChange={
                    (e)=>{ setPwd( e.currentTarget.value ) }
                } placeholder='비밀번호'/>
            </div>
            <div className='field'>
                <input type="password" value={pwdChk} onChange={
                    (e)=>{ setPwdChk( e.currentTarget.value ) }
                } placeholder='비밀번호 확인'/>
            </div>
       
            </div>
       
            <div className='btns'>
                <button onClick={ ()=>{   onSubmit()    }  }>JOIN</button>
            </div>

        </div>
        </article>
    )
}

export default Join