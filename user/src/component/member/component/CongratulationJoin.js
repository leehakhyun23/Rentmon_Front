import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti';

function CongratulationJoin() {
  const [showconffetti , setShowconffetti]= useState(true);
  useEffect(()=>{
    const timer = setTimeout(() => {
      setShowconffetti(false);
    }, 10000); // 10초

    return () => clearTimeout(timer);
  },[]);
  return (
    <div className='congTitle'>
      {(showconffetti)&&(
        <Confetti
        width={window.innerWidth*1.3}
        height={window.innerHeight*1.3}
        numberOfPieces={100}
        recycle={true}
        colors={['#0090DF','#4AC2BB',"#D40000","#8D8751"]}/>
      )}
      
        <h1>회원가입을 축하합니다.</h1>
        <h2>여러분의 빠른 대여를 위해 <br className='mo'/>지역 선택과 관심 카테고리를 최대 3개 설정해주세요.</h2>
    </div>
  )
}

export default CongratulationJoin
