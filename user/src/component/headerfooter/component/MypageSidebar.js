import React from 'react'
import LoginOff from './LoginOff'
import LoginOn from './LoginOn'

function MypageSidebar({mypagePopup , loginOn , mypageShow ,setMypagePopup , mypageBlack}) {

  return (
    <>
      <div className='ms-container' style={mypageShow}>
        {(loginOn)?(<LoginOn mypagePopup ={mypagePopup} setMypagePopup ={setMypagePopup} />):(<LoginOff setMypagePopup={setMypagePopup} />)}

        <div className='ms-container-close' onClick={()=>{setMypagePopup(false)}}><span></span></div>
      </div>
      <div className='mypageSidebarblack' onClick={()=>{setMypagePopup(false)}} style={mypageBlack}></div>
    </>
  )
}

export default MypageSidebar
