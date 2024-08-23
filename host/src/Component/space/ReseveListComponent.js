// src/components/ReseveListComponent.js

import React from 'react';

function ReseveListComponent({ record, num }) {
    return (
        <div className='reservationItem'>
            <div>예약 번호: {record.rseq}</div>
            <div>결제 금액: {record.payment}</div>
            <div>요청 사항: {record.request || '없음'}</div>
            <div>시작 시간: {new Date(record.reservestart).toLocaleString()}</div>
            <div>종료 시간: {new Date(record.reserveend).toLocaleString()}</div>
            <div>사용자 ID: {record.user.userid}</div>
            
        </div>
    );
}

export default ReseveListComponent;
