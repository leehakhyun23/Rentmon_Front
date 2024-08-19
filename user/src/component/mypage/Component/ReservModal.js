import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { dayFormat } from '../../../util/formatDate';

function ReservModal({modalon,setModalon,rerveData}) {
    Modal.setAppElement('#root');

  return (
    <div>
      <Modal isOpen={modalon} onRequestClose={()=>{setModalon(false)}}>
        <div className='mypageModal'>
        {(rerveData.space)&&(
            <div className="modal-content">
            <h2 className="modal-title">{rerveData.space.title}</h2>
            <img src={`http://localhost:8070/space_images/${rerveData.space.spaceimage[0].realName}`} alt='savefilename'/>
            <p className="modal-description">{rerveData.space.content}</p>
            <div className="modal-info">
              <div className="info-item">
                <strong>시작 시간</strong> {dayFormat(rerveData.reservestart)}
              </div>
              <div className="info-item">
                <strong>끝나는 시간</strong> {dayFormat(rerveData.reserveend)}
              </div>
              <div className="info-item">
                <strong>지불 가격</strong> {Intl.NumberFormat('ko-KR').format(rerveData.payment)}원
              </div>
              <div className="info-item">
                <strong>주소</strong> {rerveData.space.province}  {rerveData.space.town} {rerveData.space.village}
              </div>
                <div className="info-item">
                <strong>최대인원</strong> {rerveData.space.maxpersonnal}
                </div>
            </div>
    
    
    
          </div>
          )}
            <div onClick={()=>{setModalon(false)}} className="md-close">
                <span></span>
            </div>
        </div>
         
      </Modal>
    </div>
  )
}

export default ReservModal
