import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../../util/cookieUtil';
import '../css/join.css'
import { loginAction } from '../../store/HostSlice';

function Join() {

    const [hostid, setHostid] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [message, setMessage] = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onSubmit() {
        if (hostid == '') { return alert('아이디를 입력하세요'); }
        if (name == '') { return alert('이름을 입력하세요'); }
        if (email == '') { return alert('이메일을 입력하세요'); }
        if (phone == '') { return alert('전화번호를 입력하세요'); }
        if (pwd == '') { return alert('패스워드를 입력하세요'); }
        if (pwd !== pwdChk) { return alert('패스워드 확인이 일치하지 않습니다'); }

        try {
            let result = await axios.post("/api/member/join", {
                userid: hostid,
                password: pwd,
                role: "host",
              });
            // ('/api/host/join', { hostid, email, pwd, name, phone });
            if (result.data.error) {
                return setMessage("회원가입 실패. 다시 시도해 주세요.");
              }
            if (result.data.msg == 'ok') {
                await axios.post("/api/host/join", {
                    userid: hostid,
                    password: pwd,
                    name: name,
                    email: email,
                    phone: phone
                });
                alert('회원 가입이 완료되었습니다. 로그인하세요');
                navigate('/');
            }

            setCookie("token", {
                accessToken: result.data.accessToken,
                refreshToken: result.data.refreshToken,
              }, 1);

              dispatch(loginAction(result.data)); // 로그인 액션 디스패치
      navigate("/");
      
        } catch (err) {
            console.error(err);
            setMessage("회원가입 중 오류가 발생했습니다.");
        }




    }



    return (
        <article>
            <div className='joinheader'>
                <div className="logo1">호스트 회원가입</div>
                <div className='left'>

                </div>
            </div>
            <div className='joinform'>
            <div className='field'>
                    <input type="text" value={hostid} onChange={
                        (e) => { setHostid(e.currentTarget.value) }
                    } placeholder='아이디' />
                </div>
                <div className='field'>
                    <input type="text" value={name} onChange={
                        (e) => { setName(e.currentTarget.value) }
                    } placeholder='이름' />
                </div>
                <div className='field'>
                    <input type="text" value={email} onChange={
                        (e) => { setEmail(e.currentTarget.value) }
                    } placeholder='이메일' />
                </div>
                <div className='aa'>
                <div className='email'>이메일 인증</div>
                </div>
                <div className='field'>
                    <input type="text" value={phone} onChange={
                        (e) => { setPhone(e.currentTarget.value) }
                    } placeholder='전화번호' />
                </div>
                <div className='field'>
                    <input type="password" value={pwd} onChange={
                        (e) => { setPwd(e.currentTarget.value) }
                    } placeholder='비밀번호' />
                </div>
                <div className='field'>
                    <input type="password" value={pwdChk} onChange={
                        (e) => { setPwdChk(e.currentTarget.value) }
                    } placeholder='비밀번호 확인' />
                </div>
            <div className='alertmessage'><p>{message}</p></div>

            </div>

            <div>
                <button  className='join-btn' onClick={() => { onSubmit() }}>JOIN</button>
            </div>


        </article>
    )
}

export default Join