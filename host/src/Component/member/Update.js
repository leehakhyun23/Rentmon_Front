import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, setCookie } from '../../util/cookieUtil';
import { loginAction } from '../../store/HostSlice';
import '../css/update.css'

function Update() {
    const host = useSelector( state => state.host );
    const [hostid, setHostid] = useState(host.hostid);
    const [pwd, setPwd] = useState(host.pwd);
    const [pwdChk, setPwdChk] = useState(host.pwd);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState(host.nickname);
    const [message, setMessage] = useState('');
    const [isNameReadOnly, setIsNameReadOnly] = useState(true);
    const [isEmailReadOnly, setIsEmailReadOnly] = useState(true);
    const [isPhoneReadOnly, setIsPhoneReadOnly] = useState(true);
    const [buttonText, setButtonText] = useState('이름 변경하기');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const handleReadOnlyToggle = (field) => {
        switch (field) {
            case 'name':
                setIsNameReadOnly(!isNameReadOnly);
                break;
            case 'email':
                setIsEmailReadOnly(!isEmailReadOnly);
                break;
            case 'phone':
                setIsPhoneReadOnly(!isPhoneReadOnly);
                break;
            default:
                break;
        }
    };

    useEffect(
        ()=>{
            console.log(host);
            if( !host.hostid ){
                alert('로그인이 필요한 서비스입니다')
                navigate('/');
            }else{
                // setHostid(host.hostid);
                // setEmail(host.email || ''); // 이메일이 없으면 빈 문자열로 설정
                // setPhone(host.phone || '');
                // setName(host.nickname || '');
                console.log(host)
                if( host.provider === 'kakao'){
                    setPwd('kakao');
                    setPwdChk('kakao');
                    document.getElementById("pwd").readOnly=true;
                    document.getElementById("pwdChk").readOnly=true;
                }
            }
        },[host, navigate]
    );

    const onSubmit = async () => {
        if (!pwd) return alert('패스워드를 입력하세요');
        if (pwd !== pwdChk) return alert('패스워드 확인이 일치하지 않습니다');
        if (!name) return alert('이름을 입력하세요');
        if (!email) return alert('이메일을 입력하세요');
        if (!phone) return alert('전화번호를 입력하세요');
    
        try {
            const result = await axios.post('/api/host/update', {
                hostid: hostid,
                nickname: name,
                email: email || '',
                phone: phone,
            });
    
            if (result.data.msg === 'ok') {
                alert('회원정보가 수정되었습니다');
                dispatch(loginAction(result.data.loginUser));
                // const oldinfo = getCookie('host');
                // const newHost = result.data.loginUser;
                // newHost.accessToken = oldinfo.accessToken;
                // newHost.refreshToken = oldinfo.refreshToken;
                // setCookie('host', newHost);
            } else {
                alert('회원정보 수정에 실패했습니다.');
            }
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.error || "회원정보 수정 중 오류가 발생했습니다.";
            console.error("에러 발생:", errorMessage);
            setMessage("회원정보 수정 중 오류가 발생했습니다.");
        }
    };
    
    

    return (
        <article>
            {/* <div className='subPage'> */}
            
        <div className='updateheader'>
        <div className='logo1'>호스트 정보수정</div>
        <div className='left'></div>
        </div>
        <div className='updateform'>
                    <div className="box">
                        <input type="text"  value={host.hostid} readOnly placeholder={host.hostid}/>
                    </div>
                    <div className='box'>
                    <input type="text" value={host.nickname} onChange={(e) => setName(e.currentTarget.value)}
                    placeholder='이름' readOnly={isNameReadOnly}
                />
                    <div className='aa'>
                    <div className='c'   onClick={() => handleReadOnlyToggle('name')}>
                    {isNameReadOnly  ? '이름 변경하기' : '수정 완료'}
                </div>
                    </div>
                </div>
                <div className='box'>
                <input
                    type="text"
                    value={host.email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder='이메일'
                    readOnly={isEmailReadOnly}
                />
                <div className='aa'>
                    <div
                        className='c'
                        onClick={() => handleReadOnlyToggle('email')}
                    >
                        {isEmailReadOnly ? '이메일 변경하기' : '수정 완료'}
                    </div>
                </div>
            </div>
            <div className='box'>
                <input
                    type="text"
                    value={host.phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    placeholder='전화번호'
                    readOnly={isPhoneReadOnly}
                />
                <div className='aa'>
                    <div
                        className='c'
                        onClick={() => handleReadOnlyToggle('phone')}
                    >
                        {isPhoneReadOnly ? '전화번호 변경하기' : '수정 완료'}
                    </div>
                </div>
            </div>
                <div className='box'>
                    <input type="password" value={host.pwd} onChange={(e) => setPwd(e.target.value)}  placeholder='비밀번호' />
                </div>
                <div className='box'>
                    <input type="password" value={host.pwd} onChange={(e) => setPwdChk(e.target.value)} placeholder='비밀번호 확인' />
                </div>
            <div className='alertmessage'><p>{message}</p></div>
                    <div className="btns">
                        <button className="btn" onClick={ ()=>{ onSubmit(); } }>수정 완료</button>
                    </div>
                    <div className="button-container">
                    <button className="bbtn" >탈퇴하기</button>
                    </div>
                </div>
        </article>
    )
}

export default Update
