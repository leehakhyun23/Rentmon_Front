import React from 'react'

function QnaComponent({num,title,lastDate,reply ,setPopup}) {
  return (
    <div onClick={()=>{setPopup()}}>
        <div className='num'>{num}</div>
        <div className='title'>{title}</div>
        <div className='lastDate'>{lastDate}</div>
        <div className='reply'>{(reply)?("답변완료"):("미답변")}</div>
    </div>
  )
}

export default QnaComponent
