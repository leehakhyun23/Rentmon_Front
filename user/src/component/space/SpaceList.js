import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from "react-calendar";
import Space from './component/Space';
import jaxios from '../../util/jwtUtil';


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
  const search = useSelector(state => state.search);
  const [searchCnum, setSearchCnum] = useState(0);
  const [searchRegion, setSearchRegion] = useState(''); // 검색 지역
  const [searchDate, setSearchDate] = useState("");  //검색 날짜

  const [startTime, setStartTime] = useState(); //검색 예약시작시간 : 시간 
  const [endTime, setEndTime] = useState(); // 검색 예약종료시간 : 시간

  const [searchRstart, setSearchRstart] = useState(''); //검색 예약시작시간 : 날짜 + 시간
  const [searchRend, setSearchRend] = useState(''); //검색 예약종료시간 : 날짜 + 시간

  // 필터링 정보, 검색용 배열
  const [category, setCategory] = useState([]);
  const [sortOption, setSortOption] = useState(0);

  // 카테고리 들고오기
  useEffect(() => {
    getCategoryarr();
  }, []);

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

  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i < 10 ? `0${i}` : `${i}`);
  }

  let getCategoryarr = async () => {
    try {
      let result = await jaxios.get("/api/user/getCategoryList");
      setCategory(result.data);

    } catch (err) { console.error(err); }
  }



  //검색(값입력) : 
  const handleCategoryChange = (event) => {
    setSearchCnum(event.target.value);
  }

  const handleRegionChange = (event) => {
    setSearchRegion(event.target.value);
  };

  const handleRDateChange = (event) => {
    setSearchDate(event.target.value);
  }
  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    console.log()
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
      setSearchRstart(`${date} ${startTime}:00:00`);
    }
    if (date && endTime) {
      setSearchRend(`${date} ${endTime}:00:00`);
    }
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
        cnum: searchCnum,
        searchword: search.searchWord,
        province: searchRegion,
        reservestart: searchRstart,
        reserveend: searchRend,
        sortOption: sortOption
      }

      const result = await jaxios.get(`/api/space/getSpaceList`, { params });
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
        {/* 첫 번째 행 */}
        <div className="searchRow">
          <div className="searchCategory">
            <label htmlFor="category">분류 : </label>
            <select id="category" value={searchCnum} onChange={handleCategoryChange}>
              <option value="">카테고리</option>
              {category.map((category, index) => (
                <option key={index} value={category.cnum}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="searchRegion">
            <label htmlFor="region">지역 : </label>
            <select id="region" value={searchRegion} onChange={handleRegionChange}>
              <option value="">지역</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="spaceFilter">
            <label htmlFor="sort">정렬 : </label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="0">최신순</option>
              <option value="1">가격순</option>
              <option value="2">가격역순</option>
            </select>
          </div>
          <div className="searchReserve">
            <div className="searchDate" >
              <label htmlFor="calendar">예약일 : </label>
              <input type="date" id="calendar" value={searchDate} onChange={handleRDateChange} />
            </div>
            <div className="searchTime">
              <select id="startHour" value={startTime} onChange={handleStartTimeChange}>
                <option value="">시작시간</option>
                {hours.map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div className="searchTime">
              <select id="endHour" value={endTime} onChange={handleEndTimeChange}>
                <option value="">종료시간</option>
                {hours.map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button id="searchButton" onClick={async () => {
            console.log(`검색:${search.searchCategory} ${search.searchWord}, ${searchRegion}, ${searchRstart}, ${searchRend}`)
            searchSpaces();
          }}>
            검색
          </button>
        </div>
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