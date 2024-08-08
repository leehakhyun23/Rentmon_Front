import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ReservationManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('option1');
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const navigate = useNavigate();

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

  // 핸들러: 드롭다운 값에 따라 정렬
  const sortReservations = (reservations) => {
    switch (dropdownValue) {
      case 'option1':
        return [...reservations].sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순
      case 'option2':
        return [...reservations].sort((a, b) => new Date(a.date) - new Date(b.date)); // 오래된순
      case 'option3':
        return [...reservations].sort((a, b) => b.rating - a.rating); // 별점 높은 순
      case 'option4':
        return [...reservations].sort((a, b) => a.rating - b.rating); // 별점 낮은 순
      default:
        return reservations;
    }
  };

  // 컴포넌트가 렌더링될 때 예약 목록을 정렬
  const sortedReservations = sortReservations(filteredReservations);

  return (
    <div>
      <div>예약 리스트 관리</div>
      <div>
        예약 정보 검색
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <button onClick={handleSearch}>검색</button>
        <select id="myDropdown" value={dropdownValue} onChange={handleDropdownChange}>
          <option value="option1">최신순</option>
          <option value="option2">오래된순</option>
          <option value="option3">별점 높은 순</option>
          <option value="option4">별점 낮은 순</option>
        </select>
      </div>
      <div>
        <h2>예약 목록</h2>
        {sortedReservations.length > 0 ? (
          <ul>
            {sortedReservations.map(reservation => (
              <li key={reservation.id}>
                {reservation.name} - {reservation.date} - {reservation.rating}★
              </li>
            ))}
          </ul>
        ) : (
          <div>예약이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default ReservationManage;
