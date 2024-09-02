import React from 'react'
import '../css/footer.css'
import { Link, useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();
  return (
    <div className='footer'>
    <div className='innerContainer'>
      <div className='left'>
          <div className='logo' onClick={()=>{navigate("/main")}}><h2>RENTMON</h2></div>
          <div className='text'><p>최고의 공간대여 플랫폼</p></div>
      </div>
      <div className='right'>
          <div className='footer-nav'>
              <ul>
                  <li><Link to="">공간관리</Link></li>
                  <li><Link to="">예약리스트</Link></li>
                  <li><Link to="">마이페이지</Link></li>
              </ul>
          </div>
          <p>Copyright 1조 All Rights Reserved.</p>
      </div>
    </div>
  </div>
  )
}

export default Footer
