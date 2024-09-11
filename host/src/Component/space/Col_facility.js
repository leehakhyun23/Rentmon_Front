import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../css/header.css';
import '../css/facility.css';
import Header from '../HeaderFooter/Header';
import Submenu from '../member/Submenu';

function Col_facility() {
  const navigate = useNavigate();

  // Initialize select state with current facilities from Redux state
  const location = useLocation();
  const [select, setSelect] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const sseq = queryParams.get('sseq');
  // Update the state when checkboxes change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setSelect((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter(item => item !== value);
      }
    });
  };

  // Handle form submission
  const onSubmit = async () => {
    try {
      // Send data to server
      const response = await axios.post(`/api/space/updateFacilities`, {
        sseq, // Ensure sseq is available in currentSpace
        numbers: select,
      });

      if (response.status === 200) {
        console.log('Facilities updated successfully');
        navigate('/SpaceManage');
      } else {
        console.error('Failed to update facilities');
      }
    } catch (error) {
      console.error('Error occurred during submission:', error);
    }
  };

  return (
    <div>
          <div className='rheader'>
                <div className='logo3'>시설 선택</div>
                {/* <div className='left'><Submenu /></div> */}
            </div>
      <div className="facility-container">
        {[
          'TV/프로젝터',
          '인터넷/WIFI',
          '복사/인쇄기',
          '화이트보드',
          '음향/마이크',
          '취사시설',
          '음식불반입가능',
          '주류반입가능',
          '샤워시설',
          '주차',
          '금연',
          '반려동물 동반가능',
          'PC/노트북',
          '의자/테이블',
          '콘센트',
          '24시 운영',
          '연중무휴',
          '카페/레스토랑',
          '간단한 다과/음료',
          '개인락커',
          '메일 서비스',
          '공용 주방',
          '정수기',
          '케이터링',
          '난방기',
          '에어컨',
          '팩스',
          '창고서비스',
          '택배발송서비스',
          '내부화장실',
          '탈의실',
          '테라스/루프탑',
          '라운지/대기실',
          '전신거울',
          '바베큐시설',
          '도어락',
          '전기',
          '장비대여',
          '장작판매',
          '온수',
          '마트/편의점',
          '놀이터',
          '산책로',
          '구급약품',
          '남/여 화장실 구분',
          '급수시설'
        ].map((facility, index) => (
          <label key={index} className="facility-item">
            <input
              type="checkbox"
              value={index + 1}
              checked={select.includes(String(index + 1))}
              onChange={handleCheckboxChange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      <div className="but2">
        <button className="but" onClick={() => navigate('/SpaceManage')}>이전</button>
        <button className="but" onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
}

export default Col_facility;
