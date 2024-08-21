/* global naver */

import { async } from 'q';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getCoordinates } from '../../../util/citibaming';
import { dayFormat } from '../../../util/formatDate';
import { openNaverMap, searchAddressToCoordinate, searchAddressToCoordinatereturn } from '../../../util/NaverMap';

function ReservModal({ modalon, setModalon, rerveData }) {
  const [message, setMessage] = useState('');
  const [map , setmap] = useState();
    useEffect(() => {
      mdalon();
    }, [modalon, rerveData]);

    const mdalon=async()=>{
      try{
        setMessage("");
        if (modalon && rerveData.space) {
          let assress = rerveData.space.province + " " + rerveData.space.town + " " + rerveData.space.village  + " " + rerveData.space.addressdetail;
          // 모달이 열리고 예약 데이터가 있을 때 지도 초기화
          let result = await getCoordinates(assress);
          setmap(result);
          searchAddressToCoordinate(assress ,setMessage , rerveData.space.title );
          
         }
      }catch(err){
        console.error(err);
        setMessage("저장된 주소가 올바르지 않습니다.");
      }
    }

    useEffect(()=>{
    },[map]);


    return (
        <div>
            <Modal isOpen={modalon} onRequestClose={() => { setModalon(false) }}>
                <div className='mypageModal '>
                    {rerveData.space && (
                        <div className="modal-content scrollbar">
                            <h2 className="modal-title">{rerveData.space.title}</h2>
                            {(rerveData.space.spaceimage[0])&&(<img src={`http://localhost:8070/space_images/${rerveData.space.spaceimage[0].realName}`} alt='savefilename'/>)}
                            <p className="modal-description">{rerveData.space.content}</p>
                            <div className="modal-info">
                                <div className="info-item">
                                    <strong>시작 시간</strong><span>{dayFormat(rerveData.reservestart)}</span>
                                </div>
                                <div className="info-item">
                                    <strong>끝나는 시간</strong><span>{dayFormat(rerveData.reserveend)}</span>
                                </div>
                                <div className="info-item price">
                                    <strong>지불 가격</strong> {Intl.NumberFormat('ko-KR').format(rerveData.payment)}원
                                </div>
                                <div className="info-item">
                                    <strong>주소</strong> {rerveData.space.province} {rerveData.space.town} {rerveData.space.village}
                                </div>
                                <div className="info-item">
                                    <strong>최대인원</strong> {rerveData.space.maxpersonnal}
                                </div>
                            </div>
                            <div className='mapwrap'>
                              <h2>위치</h2>
                                {(message)?(<div className='message'>{message}</div>):(
                                    <>
                                      <div id="map" style={{ height: '400px' }}></div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    <div onClick={() => { setModalon(false) }} className="md-close">
                        <span></span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ReservModal;
