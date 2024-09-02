import React from 'react'
import { Link } from 'react-router-dom'

function LoginOff({setMypagePopup}) {
  return (
    <div className='logOff'>
      <div className='logingoContainer'>
        <p>로그인 후 이용해주세요!</p>
        <Link to="/login" onClick={()=>{setMypagePopup(false)}}>로그인 하러가기</Link>
      </div>
      <div className='goHost'>
        <a href="/">호스트 센터로 가기 &gt;</a>
      </div>
    </div>
  )
}

export default LoginOff
