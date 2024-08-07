import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Update() {

    const [hostid, setHostid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = useSelector( state => state.user );

    useEffect(
        ()=>{
            if( !loginUser.hostid ){
                alert('로그인이 필요한 서비스입니다')
                navigate('/');
            }else{
                setHostid( loginUser.hostid );
                setEmail( loginUser.email );
                setPhone( loginUser.phone );
                setName( loginUser.name );
                console.log(loginUser)
                if( loginUser.provider == 'kakao'){
                    setPwd('kakao');
                    setPwdChk('kakao');
                    document.getElementById("pwd").readOnly=true;
                    document.getElementById("pwdChk").readOnly=true;
                }
            }
        },[loginUser, navigate]
    );


    const customStyles = {
        overlay: {
            backgroundColor: "rgba( 0 , 0 , 0 , 0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    function onUpdate(){
        
        if( !pwd ){ return alert('패스워드를 입력하세요'); }
        if( pwd != pwdChk ){ return alert('패스워드 확인이 일치하지 않습니다'); }
        if( !name ){ return alert('이름을 입력하세요'); }
        if( !email ){ return alert('이메일을 입력하세요'); }
        if( !phone ){ return alert('전화번호를 입력하세요'); }

        axios.post('/api/host/Update' , {hostid, pwd, name, email, phone}  )
        .then((result)=>{ 
            alert('회원정보가 수정되었습니다');
            dispatch( loginAction( result.data.loginUser ) )
            window.location.href='/';
        } )
        .catch((err)=>{console.error(err)})
    }

    return (
        <article>
            <div className='subPage'>
                
                <div className='memberform'>
                    <h2>Join</h2>
                    <div className="field">
                        <label>Host ID</label>
                        <input type="text"  value={hostid} readOnly />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" id="pwd" value={pwd} onChange={(e)=>{
                            setPwd( e.currentTarget.value );
                        }}/>
                    </div>
                    <div className="field">
                        <label>reType Password</label>
                        <input type="password" id="pwdChk" value={pwdChk} onChange={(e)=>{
                            setPwdChk( e.currentTarget.value );
                        }}/>
                    </div>
                    <div className="field">
                        <label>name</label>
                        <input type="text" value={name} onChange={(e)=>{
                            setName( e.currentTarget.value );
                        }}/>
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <input type="text" value={phone} onChange={(e)=>{
                            setPhone( e.currentTarget.value );
                        }}/>
                    </div>
                    <div className="field">
                        <label>E-mail</label>
                        <input type="text" value={email} onChange={(e)=>{
                            setEmail( e.currentTarget.value );
                        }}/>
                    </div>
                    <div className="btns">
                        <button onClick={ ()=>{ onUpdate(); } }>수정 완료</button>
                        <button onClick={()=>{navigate('/')}}>돌아가기</button>
                    </div>
                </div>
                
            </div>
        </article>
    )
}

export default Update
