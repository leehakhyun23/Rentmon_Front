import React, { useState, useEffect } from 'react';
import Header from '../HeaderFooter/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Submenu from '../member/Submenu';

function Col_useInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sseq = queryParams.get('sseq');
  const [starttime, setStarttime] = useState('');
  const [endtime, setEndtime] = useState('');

  const handleOnChange = (e, setter) => {
    setter(e.target.value);
  };

  useEffect(() => {
    if (sseq) {
      // 기존 공간 데이터 가져오기
      axios.get(`/api/space/colspace?sseq=${sseq}`)
        .then(response => {
          const space = response.data;
          setStarttime(space.starttime);
          setEndtime(space.endtime);
        })
        .catch(error => {
          console.error('공간 데이터 가져오기 오류:', error);
        });
    }
  }, [sseq]);

  const onSubmit = () => {
    if (!starttime || !endtime) {
        alert('시작 시간과 종료 시간을 모두 선택해 주세요.');
        return;
    }

    axios.put(`/api/space/spacetime/${parseInt(sseq, 10)}`, {
        // sseq: , // sseq를 정수로 변환
        starttime: parseInt(starttime, 10), // starttime을 정수로 변환
        endtime: parseInt(endtime, 10) // endtime을 정수로 변환
    })
    .then(response => {
        console.log('공간 정보가 성공적으로 업데이트되었습니다.');
        navigate('/SpaceManage'); // 업데이트 후 페이지 이동
    })
    .catch(error => {
        console.error('공간 정보 업데이트 오류:', error);
    });
};

  return (
    <div>
      <div className='rheader'>
            <div className='logo3'>이용 안내 수정</div>
            <div className='left'><Submenu /></div>
             </div>
      <div className='time-container'>
        <span className='time-label'>이용 시간</span>
        <select
          className='time-select'
          value={starttime}
          onChange={(e) => handleOnChange(e, setStarttime)}
        >
          <option value="" disabled>선택</option>
          {[...Array(24).keys()].map(hour => (
            <option key={hour} value={String(hour).padStart(2, '0')}>
              {String(hour).padStart(2, '0')}
            </option>
          ))}
        </select>
        <span> ~ </span>
        <select
          className='time-select'
          value={endtime}
          onChange={(e) => handleOnChange(e, setEndtime)}
        >
          <option value="" disabled>선택</option>
          {[...Array(25).keys()].map(hour => (
            <option key={hour} value={String(hour).padStart(2, '0')}>
              {String(hour).padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>
      <div className="but2">
        <button className="but" onClick={() => navigate('/SpaceManage')}>이전</button>
        <button className="but" onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
}

export default Col_useInfo;
