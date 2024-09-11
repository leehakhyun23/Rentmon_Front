import React from 'react'

function QnaComponent({num,elem ,setIsOpen,setPopup}) {
  return (
    <div  style={{cursor:"pointer"}} onClick={()=>{
      setPopup(elem);
      setIsOpen(true);
    }}>
        <div className='num'>{num}</div>
        <div className='title'>{elem.title}</div>
        {/* <div className='lastDate'>{elem.lastDate}</div> */}
        <div className='reply'>{(elem.reply)?("답변완료"):("미답변")}</div>
    </div>
  )
}

export default QnaComponent
