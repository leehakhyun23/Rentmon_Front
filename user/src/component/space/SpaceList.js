import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from "react-calendar";
import Space from './component/Space';
import './style/space.css';

import SpaceBoxComponent from '../main/componenet/SpaceBoxComponent';




function SpaceList() {

  // 유저 정보
  const user = useSelector(state => state.user);

  // 공간 정보
  const [spaceList, setSpaceList] = useState([]);   //SpaceDTO 리스트
  const [page, setPage] = useState(0);  // 페이징
  const [loading, setLoading] = useState(false);  //무한스크롤 로딩방지
  const [hasmore, setHasmore] = useState(true);   //무한스크롤 

  // 검색 정보
  const [searchWord, setSearchWord] = useState('');   // 검색 해시태그
  const [searchRegion, setSearchRegion] = useState(''); // 검색 지역
  const [searchDate, setSearchDate] = useState("");  //검색 날짜

  const [startTime, setStartTime] = useState(); //검색 예약시작시간 : 시간 
  const [endTime, setEndTime] = useState(); // 검색 예약종료시간 : 시간

  const [searchRstart, setSearchRstart] = useState(''); //검색 예약시작시간 : 날짜 + 시간
  const [searchRend, setSearchRend] = useState(''); //검색 예약종료시간 : 날짜 + 시간

  // 필터링 정보
  const [sortOption, setSortOption] = useState(0);


  // 무한스크롤
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadMoreSpaces();
  }, [page]);



  // 검색값(지역)
  const regions = ['서울', '경기', '인천', '부산', '광주', '대구', '대전', '울산', '제주', '강원', '경남', '경북', '전남', '전북'];


  //검색(값입력) : 
  const handleWordChange = (event) => {
    setSearchWord(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSearchRegion(event.target.value);
  };

  const handleRDateChange = (event) => {
    setSearchDate(event.target.value);
  }
  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
    updateReservationTimes(searchDate, time, endTime);
  };
  const handleEndTimeChange = (event) => {
    const time = event.target.value;
    setEndTime(time);
    updateReservationTimes(searchDate, startTime, time);
  };

  const updateReservationTimes = (date, startTime, endTime) => {
    if (date && startTime) {
      setSearchRstart(`${date} ${startTime}:00`);
    }
    if (date && endTime) {
      setSearchRend(`${date} ${endTime}:00`);
    }
  };


  // 검색 했을 때(새롭게 GetSpaceList)
  const handleSearch = () => {
    setPage(0);
    setSpaceList([]);
    loadMoreSpaces();
  };

  // 필터링 : 
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    console.log(`선택된 정렬 기준: ${event.target.value}`);

  }
  // SpaceList 조회 + 무한스크롤
  const loadMoreSpaces = async () => {
    try {
      const params = {
        page,
        searchword: searchWord,
        province: searchRegion,
        reservestart: searchRstart,
        reserveend: searchRend,
        sortOption: sortOption
      }

      const result = await axios.get(`/api/space/getSpaceList`, { params });
      console.log(result);
      setSpaceList(prevSpaces => [...prevSpaces, ...result.data]);
      console.log(page);

      if (result.data.length === 0) {
        setHasmore(false);
      }

    } catch (error) {
      console.error('Failed to load spaces:', error);
    } finally {
      setLoading(false);
    }
    console.log(spaceList);
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - 50; // 스크롤이 가능한 크기
    const scrollTop = document.documentElement.scrollTop;  // 현재 위치
    const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(prevPage => prevPage + 1);
    }
  }

  const searchSpaces = async () => {
    setPage(0);
    setSpaceList([]);
    loadMoreSpaces();
  }


  return (
    <div className='spaceContainer innerContainer'>
      <div className="searchSection">
        <div className="searchWord">
          <label>일단 여기서 word인풋 : </label>
          <input value={searchWord} onChange={handleWordChange} />
        </div>

        <div className="searchRegion">
          <label htmlFor="region">지역:</label>
          <select id="region" value={searchRegion} onChange={handleRegionChange}>
            <option value="">지역을 선택하세요</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="searchTime">
          <label htmlFor="calendar">예약일 : </label>
          <input type="date" id="calendar" value={searchDate} onChange={handleRDateChange} />
          <label htmlFor="calendar">시작시간 : </label>
          <input type="time" id="getTime" value={startTime} onChange={handleStartTimeChange} />
          <label htmlFor="calendar">종료시간 : </label>
          <input type="time" id="getTime" value={endTime} onChange={handleEndTimeChange} />
        </div>

        <div className="spaceFilter">
          <label htmlFor="sort"></label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="0">최신순</option>
            <option value="1">가격순</option>
            <option value="2">가격역순</option>
            {/* <option value="3">찜순</option>
            <option value="4">별점순</option> */}
          </select>
        </div>

        <button id="searchButton" onClick={async () => {
          console.log(`검색: ${searchWord}, ${searchRegion}, ${searchRstart}, ${searchRend}`)
          searchSpaces();
        }}>
          검색
        </button>
      </div>

      <div className="spaces">
        {
          (spaceList) ? (
            spaceList.map((spaceDTO, idx) => {
              return (
                <SpaceBoxComponent key={idx} record={spaceDTO} />
              )
            })
          ) : (null)
        }
      </div>
    </div>


  )
}

export default SpaceList;