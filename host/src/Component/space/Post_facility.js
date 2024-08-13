import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSpace } from '../../store/spaceSlice'; // Import your Redux slice
import '../css/header.css';
import '../css/facility.css';

function Post_facility() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve current space information from Redux state
  const currentSpace = useSelector((state) => state.space);

  // Initialize select state with current facilities from Redux state
  const [select, setSelect] = useState(currentSpace.selectedFacilities || []);

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
  const onSubmit = () => {
    dispatch(setSpace({
      cnum: currentSpace.cnum || '', // Use existing cnum
      title: currentSpace.title || '', // Maintain existing values
      subtitle: currentSpace.subtitle || '',
      price: currentSpace.price ||'',
      personnal: currentSpace.personnal || '',
      maxpersonnal: currentSpace.maxpersonnal || '',
      content: currentSpace.content || '',
      caution: currentSpace.caution || '',
      zipcode: currentSpace.zipcode || '',
      province: currentSpace.province || '',
      town: currentSpace.town || '',
      village: currentSpace.village || '',
      address_detail: currentSpace.address_detail || '',
      imgSrc: currentSpace.imgSrc || '',
      starttime: currentSpace.starttime,
      endtime: currentSpace.endtime,
      startDate: currentSpace.startDate,
      endDate: currentSpace.endDate,
      monthholi: currentSpace.monthholi,
      weekholi: currentSpace.weekholi,
      dayholi: currentSpace.dayholi ,
      fnum: select,
    }));
    navigate('/Post_payment');
  };

  return (
    <div>
      <div className='header2'>시설 선택</div>
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
        <button className="but" onClick={() => navigate('/Post_useInfo')}>이전</button>
        <button className="but" onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
}

export default Post_facility;
