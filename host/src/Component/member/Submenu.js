import React, { useRef, useState } from 'react';
import '../css/submenu.css';
import { useNavigate } from 'react-router-dom';

function Submenu() {
  const [isOpen, setIsOpen] = useState(false);
  const subBarRef = useRef(null);
  const navigate = useNavigate();


  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="menu" onClick={() => setIsOpen(!isOpen)}>
      <span>Menu</span>
      <ul className={`sub ${isOpen ? 'open' : ''}`} ref={subBarRef}>
      <button className="close-btn" onClick={closeMenu}>×</button>
        <li><a href="#None" onClick={() => { navigate('/') }}>Home</a></li>
        <li><a href="#None" onClick={() => { navigate('/') }}>예약/캘린더</a></li>
        <li><a href="#None" onClick={() => { navigate('/ReviewManage') }}>후기/Q&A</a></li>
        <li><a href="#None" onClick={() => { navigate('/SpaceManage') }}>공간관리</a></li>
        <li><a href="#None" onClick={() => { navigate('/') }}>1:1문의</a></li>
        <li><a href="#None" onClick={() => { navigate('/') }}>공지사항</a></li>
        <li><a href="#None" onClick={() => { navigate('/Report') }}>운영지표</a></li>
        <li><a href="#None" onClick={() => { navigate('/') }}>정산</a></li>
        <li><a href="#None" onClick={() => { navigate('/Update') }}>정보수정</a></li>
      </ul>
    </div>
  );
}

export default Submenu;

