import React from 'react'
import { useNavigate } from 'react-router-dom';
import Submenu from '../member/Submenu';
import '../css/header.css'

function Header() {
  const navigate = useNavigate(); 


  return (
    <div className='header'>
        <div className='logo'>RENTMON</div>
        <div className='logo2'><h3>호스트센터</h3></div>
        <div className='left'>
        <button className='loginbtn' onClick={()=>{navigate('/Login')}}>호스트 로그인</button>
        <Submenu />
          {/* <Link className='loginbtn' to={'/Login'}>호스트 로그인</Link> */}
        </div>
    </div>

  )
}

export default Header
