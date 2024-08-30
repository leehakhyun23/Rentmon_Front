import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Redux 상태를 가져오기 위한 훅
import { fetchTitlesByHostid, fetchSseqByTitle } from './api'; // 수정된 API 호출 함수들
import Header from '../HeaderFooter/Header'
import '../css/ReseveListComponent.css'; // CSS 파일을 임포트
import '../css/header.css';
import '../css/reviewManage.css'
import Submenu from '../member/Submenu';

function ReservationManage() {
    // Redux에서 hostid 가져오기
    const hostid = useSelector((state) => state.host.hostid); // hostSlice에서 hostid 가져오기
    const [titles, setTitles] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownValue, setDropdownValue] = useState('option1');

    // 호스트 ID에 기반하여 titles을 가져오는 함수
    const getTitles = async () => {
        try {
            const titleList = await fetchTitlesByHostid(hostid);
            setTitles(titleList);
        } catch (error) {
            console.error('titles를 가져오는 데 문제가 발생했습니다.', error);
        }
    };

    useEffect(() => {
        getTitles();
    }, [hostid]);

    useEffect(() => {
        if (selectedTitle !== null && selectedTitle !== '') {
            getReservations(selectedTitle);
        }
    }, [selectedTitle]);
    
    // 선택된 title에 기반하여 예약 정보를 가져오는 함수
    const getReservations = async (title) => {
        try {
            const reservationsList = await fetchSseqByTitle(title);
            
            // 필요한 정보만 추출하여 새 배열 생성
            const simplifiedReservations = reservationsList.map(reservation => ({
                rseq: reservation.rseq,
                payment: reservation.payment,
                request: reservation.request,
                reservestart: reservation.reservestart,
                reserveend: reservation.reserveend,
                user: reservation.user
            }));
    
            setReservations(simplifiedReservations);
            setFilteredReservations(simplifiedReservations); // 초기 필터링
        } catch (error) {
            console.error('예약 정보를 가져오는 데 문제가 발생했습니다.', error);
        }
    };

    // 검색 입력값 업데이트
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 드롭다운 값 업데이트
    const handleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
    };

    // 검색 버튼 클릭 시
    const handleSearch = () => {
        const filtered = reservations.filter(reservation =>
            reservation.user.userid.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReservations(filtered);
    };

    // 드롭다운 값에 따라 정렬
    const sortReservations = (reservations) => {
        switch (dropdownValue) {
            case 'option1':
                return [...reservations].sort((a, b) => new Date(b.reservestart) - new Date(a.reservestart)); // 최신순
            case 'option2':
                return [...reservations].sort((a, b) => new Date(a.reservestart) - new Date(b.reservestart)); // 오래된순
            case 'option3':
                return [...reservations].sort((a, b) => b.payment - a.payment); // 가격 높은 순
            case 'option4':
                return [...reservations].sort((a, b) => a.payment - b.payment); // 가격 낮은 순
            default:
                return reservations;
        }
    };

    const sortedReservations = sortReservations(filteredReservations);

    return (
        <div>
            <div className='rheader'>
            <div className='logo3'>예약 리스트 관리</div>
            <div className='left'><Submenu /></div>
      </div>
            <div>
                <br />
                <select className='hi' onChange={(e) => setSelectedTitle(e.target.value)}>
                    <option value="" >선택하세요</option>
                    {titles.map(title => (
                        <option key={title} value={title}>{title}</option>
                    ))}
                </select>
            </div>
            <div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center'
}}>
            <div className='search'>
                예약 정보 검색
                <input type="text" value={searchTerm}  placeholder="고객명으로 검색"  onChange={handleSearchChange} />
                <button className='searchbutton' onClick={handleSearch}>검색</button>
                <div className="container1">
              <div className="select-container">
                <select id="myDropdown" className='filterContainer' value={dropdownValue} onChange={handleDropdownChange}>
                    <option value="option1">최신순</option>
                    <option value="option2">오래된순</option>
                    <option value="option3">가격 높은 순</option>
                    <option value="option4">가격 낮은 순</option>
                </select>
                </div>
                </div>
                </div>
            </div>
            <div>
                {filteredReservations.length > 0 ? (
                    <table className='reservationTable'>
                        <thead>
                            <tr>
                                <th>예약 번호</th>
                                <th>결제 금액</th>
                                <th>요청 사항</th>
                                <th>시작 시간</th>
                                <th>종료 시간</th>
                                <th>사용자 ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedReservations.map((elem, key) => (
                                <tr key={key}>
                                    <td>{elem.rseq}</td>
                                    <td>{elem.payment}</td>
                                    <td>{elem.request || '없음'}</td>
                                    <td>{new Date(elem.reservestart).toLocaleString()}</td>
                                    <td>{new Date(elem.reserveend).toLocaleString()}</td>
                                    <td>{elem.user.userid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>검색 결과가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default ReservationManage;