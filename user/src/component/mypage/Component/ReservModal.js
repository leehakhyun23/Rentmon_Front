/* global naver */

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { dayFormat } from '../../../util/formatDate';

function ReservModal({ modalon, setModalon, rerveData }) {
  const [message, setMessage] = useState('');
    useEffect(() => {
        if (modalon && rerveData.space) {
            // 모달이 열리고 예약 데이터가 있을 때 지도 초기화
            console.log(rerveData.space.province + " "+ rerveData.space.town + " "+rerveData.space.village + " " + rerveData.space.addressdetail);
            searchAddressToCoordinate(rerveData.space.province + " "+ rerveData.space.town + " "+rerveData.space.village + " " + rerveData.space.addressdetail );
        }
    }, [modalon, rerveData]);

    function searchAddressToCoordinate(address) {
      setMessage("");
        naver.maps.Service.geocode({
            query: address
        }, function (status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
              return alert('Something Wrong!');
            }
            if (response.v2.meta.totalCount === 0) {
              return setMessage("주소가 올바르지 않습니다.");
            }
           

            var item = response.v2.addresses[0];
            insertAddress(item.roadAddress, item.y, item.x);
        });
    }

    function insertAddress(address, latitude, longitude) {
        var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(latitude, longitude),
            zoom: 19
        });
        var marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(latitude, longitude),
        });
    }

    return (
        <div>
            <Modal isOpen={modalon} onRequestClose={() => { setModalon(false) }}>
                <div className='mypageModal '>
                    {rerveData.space && (
                        <div className="modal-content scrollbar">
                            <h2 className="modal-title">{rerveData.space.title}</h2>
                            <img src={`http://localhost:8070/space_images/${rerveData.space.spaceimage[0].realName}`} alt='savefilename' />
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
                            <div>
                                <h2>위치</h2>
                                {(message)?(message):(
                                    <div id="map" style={{ height: '400px' }}></div>
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
