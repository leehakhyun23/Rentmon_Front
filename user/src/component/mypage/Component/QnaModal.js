import React from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


function QnaModal({isopen , setIsOpen , popup}) {
  return (
    (popup.space)&&(
        <Modal isOpen={isopen} onRequestClose={()=>{setIsOpen(false)}} ariaHideApp={false}>
        <div className='qnamodal modal'>
            <h2>문의</h2>
            <div className='userinquiry'>
                <div className='title'>{popup.title}</div>
                <div className='content'>{popup.content}</div>
                <div className='createday'>{popup.created_at}</div>
            </div>
            {(popup.reply)?(<div className='reply'>
                <p>답변</p>
                {/* <div className='hostid'>{popup.space.host.hostid} : </div> */}
                <div className='content'>{popup.reply}</div>
                <div className='replydate'>{popup.replydate}</div>
            </div>):(<div className='noreply'>미답변</div>)}
            

            <div className='spaceInfo'>
                {(popup.space.spaceimage&&popup.space.spaceimage.length>0)&&(<img src={`http://localhost:8070/space_images/${popup.space.spaceimage[0].realName}`}/>)}
                <div className='spaceName'>
                    <p>공간 이름</p>
                    <span>{popup.space.title}</span>
                </div>
                <Link to={`/spaceDetail/${popup.space.sseq}`}>공간 보러가기<IoIosArrowForward /></Link>
            </div>
        </div>
        <div className='md-close' onClick={()=>{setIsOpen(false)}}><span></span></div>
    </Modal>
    )
    
  )
}

export default QnaModal
