import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../../store/HostSlice';
import '../css/update.css';
import '../css/submenu.css';
import '../css/header.css';
import { removeCookie } from '../../util/cookieUtil';
import Submenu from './Submenu';

function Update() {
    const host = useSelector(state => state.host);
    const [hostid, setHostid] = useState(host.hostid);
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [phone, setPhone] = useState(host.phone || '');
    const [email, setEmail] = useState(host.email || '');
    const [name, setName] = useState(host.nickname || '');
    const [message, setMessage] = useState('');
    const [isNameReadOnly, setIsNameReadOnly] = useState(true);
    const [isEmailReadOnly, setIsEmailReadOnly] = useState(true);
    const [isPhoneReadOnly, setIsPhoneReadOnly] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleReadOnlyToggle = (field) => {
        switch (field) {
            case 'name':
                setIsNameReadOnly(false);
                break;
            case 'email':
                setIsEmailReadOnly(false);
                break;
            case 'phone':
                setIsPhoneReadOnly(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // 정보를 수정할 때만 경고를 띄우도록 수정
        if (host.hostid || host.provider !== 'kakao') {
            if (!host.hostid) {
                alert('로그인이 필요한 서비스입니다');
                navigate('/host/main');
            }
        }
    }, [host, navigate]);

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
    
    const handleDelete = async () => {
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            try {
                const result = await axios.delete('/api/host/delete', { params: { hostid } });
    
                if (result.data.msg === 'ok') {
                    alert('회원탈퇴가 완료되었습니다.');
                    // dispatch(loginAction(null)); // 로그아웃 처리
                        removeCookie("host");   
                        dispatch( logoutAction() );
                    navigate('/');
                } else {
                    alert('회원탈퇴에 실패했습니다.');
                }
            } catch (err) {
                // 더 상세한 에러 처리
                if (err.response) {
                    console.error("서버 응답 오류:", err.response.data);
                    setMessage(`회원탈퇴 중 오류가 발생했습니다: ${err.response.data.message || err.message}`);
                } else {
                    console.error("네트워크 오류:", err.message);
                    setMessage("회원탈퇴 중 네트워크 오류가 발생했습니다.");
                }
            }
        }
    };
    

    return (
        <article>
        <div className='rheader'>
        <div className='logo3'>정보 수정</div>
        <div className='left'><Submenu /></div>
      </div>
            <div className='updateform'>
                <div className="box">
                    <input type="text" value={hostid} readOnly placeholder={hostid} />
                </div>
                <div className='box'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder='이름'
                        readOnly={isNameReadOnly}
                    />
                    {isNameReadOnly && (
                        <div className='aa'>
                            <div className='c' onClick={() => handleReadOnlyToggle('name')}>
                                이름 변경하기
                            </div>
                        </div>
                    )}
                </div>
                <div className='box'>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder='이메일'
                        readOnly={isEmailReadOnly}
                    />
                    {isEmailReadOnly && (
                        <div className='aa'>
                            <div className='c' onClick={() => handleReadOnlyToggle('email')}>
                                이메일 변경하기
                            </div>
                        </div>
                    )}
                </div>
                <div className='box'>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.currentTarget.value)}
                        placeholder='전화번호'
                        readOnly={isPhoneReadOnly}
                    />
                    {isPhoneReadOnly && (
                        <div className='aa'>
                            <div className='c' onClick={() => handleReadOnlyToggle('phone')}>
                                전화번호 변경하기
                            </div>
                        </div>
                    )}
                </div>
                <div className='box'>
                    <input type="password" onChange={(e) => setPwd(e.target.value)} placeholder='비밀번호' />
                </div>
                <div className='box'>
                    <input type="password" onChange={(e) => setPwdChk(e.target.value)} placeholder='비밀번호 확인' />
                </div>
                <div className='alertmessage'><p>{message}</p></div>
                <div className="btns">
                    <button className="btn" onClick={onSubmit}>수정 완료</button>
                </div>
                <div className="button-container">
                    <button className="bbtn" onClick={handleDelete}>탈퇴하기</button>
                </div>
            </div>
        </article>
    );
}

export default Update;
