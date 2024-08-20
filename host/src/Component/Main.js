import React from 'react'
import Header from './HeaderFooter/Header';


import { useNavigate } from 'react-router-dom';
import './css/main.css'



function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <Header/>

      <div className='detail'>
        공간대여
      </div>
      <div className='field'>
        <div>공간비지니스를 시작해보세요!</div>
        <div><button className='btn1' onClick={() => navigate('/Post_cate')}>공간 등록하기</button></div>
        <div>등록 가능 공간 | 촬영 · 스터디 · 공연 · 운동 · 캠핑시설까지</div>
      </div>

      <div className='field'>
        <button className='btn2' onClick={()=>{navigate('/Join')}}>
          공간 호스트 시작하기
        </button>
      </div>

    </div>
  )
}

export default Main
