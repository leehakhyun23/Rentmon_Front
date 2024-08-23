import React, { useEffect, useState } from 'react';
import Header from '../HeaderFooter/Header'
import Submenu from '../member/Submenu';
import '../css/reviewManage.css'
import '../css/header.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function ReviewManage() {
  const host = useSelector(state => state.host);
  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState('review'); // 'review' 또는 'qna'

  // 검색어와 드롭다운 값을 관리하는 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('option1');
  const [reservations, setReservations] = useState([]); // 예시 데이터 배열
  const [filteredReservations, setFilteredReservations] = useState([]);
  const navigate = useNavigate();


  // 탭 클릭 시 상태 변경 함수
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 핸들러: 검색 입력값 업데이트
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 핸들러: 드롭다운 값 업데이트
  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  // 핸들러: 검색 버튼 클릭 시
  const handleSearch = async () => {
    try {
      // 여기에 API 호출을 통해 데이터를 가져오는 로직을 추가할 수 있습니다.
      // 예시: const response = await axios.get(`/api/reservations?search=${searchTerm}`);
      // setReservations(response.data);
      
      // 필터링 로직 (예시)
      const filtered = reservations.filter(reservation =>
        reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReservations(filtered);
    } catch (error) {
      console.error("데이터를 가져오는 데 문제가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    // 정보를 수정할 때만 경고를 띄우도록 수정
    if (host.hostid || host.provider !== 'kakao') {
        if (!host.hostid) {
            alert('로그인이 필요한 서비스입니다');
            navigate('/');
        }
    }
}, [host, navigate]);
  
  return (
    <article>
      <div className='rheader'>
        <div className='logo3'>이용 후기 관리</div>
        <div className='left'><Submenu /></div>
      </div>
      <div className='rq'>
      <button
        className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
        onClick={() => handleTabClick('review')}
      >
        이용 후기
      </button>
      <button
        className={`tab-button ${activeTab === 'qna' ? 'active' : ''}`}
        onClick={() => handleTabClick('qna')}
      >
        Q&A
      </button>
      </div>
      <div>
        {activeTab === 'review' && (
          <div>
            {/* 이용 후기 관련 콘텐츠 */}
            <div className='search'>
              <div>예약 정보 검색</div>
              <input type="text" value={searchTerm} onChange={handleSearchChange} style={{width:'80%'}}/>
              <button onClick={handleSearch}>검색</button>
            </div>
            <div className="container1">
              <div className="select-container">
                <select id="myDropdown" value={dropdownValue} onChange={handleDropdownChange}>
                  <option value="option1">최신순</option>
                  <option value="option2">오래된순</option>
                  <option value="option3">별점 높은 순</option>
                  <option value="option4">별점 낮은 순</option>
              </select>
            </div>
            </div>
            <div>
              {/* 필터링된 결과 표시 */}
              <ul>
                {filteredReservations.map((reservation, index) => (
                  <li key={index}>{reservation.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'qna' && (
          <div className='qnaa'>
            {/* Q&A 관련 콘텐츠 */}
            <h2>Q&A 내용</h2>
            <p>여기에 Q&A 관련 정보를 추가하세요.</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default ReviewManage;
