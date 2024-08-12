import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Space from './component/Space';

import './style/space.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

function SpaceList() {
  // 로그인 유저 자원
  const user = useSelector(state => state.user);

  // 공간 열람 자원
  const [spaceList, setSpaceList] = useState([]);   //SpaceDTO 리스트
  const [page, setPage] = useState(0);  // 페이징
  const [loading, setLoading] = useState(false);  //무한스크롤 로딩방지
  const [hasmore, setHasmore] = useState(true);   //무한스크롤 

  // 검색 자원
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPersonnal, setSelectedPersonnal] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  // 필터링 자원
  const [sortOption, setSortOption] = useState('등록시간순');


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadMoreSpaces();
  }, [page]);



  // 검색값
  const regions = ['서울', '경기', '인천', '부산', '광주', '대구', '대전', '울산', '제주', '강원', '경남', '경북', '전남', '전북'];
  const personOptions = ['1명', '2명', '3명', '4명', '5명', '6명 이상'];


  //검색 : 
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  const handlePersonnalChange = (event) => {
    setSelectedPersonnal(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  // 필터링 : 
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    console.log(`선택된 정렬 기준: ${event.target.value}`);

  }
    // 무한스크롤
    const loadMoreSpaces = async () => {
      if (loading) return; // 이미 로딩 중이면 중복 요청 방지
      setLoading(true);
      try {
        const result = await axios.get(`/api/space/getSpaceList/${page}`);
        setSpaceList(prevSpaces => [...prevSpaces, ...result.data]);
        console.log(page);
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



    return (
      <div className='innerContainer'>
        <div>

        검색 Section
          <div className="space_search">
            <div>
              <label htmlFor="region">지역:</label>
              <select id="region" value={selectedRegion} onChange={handleRegionChange}>
                <option value="">지역을 선택하세요</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="personnal">인원:</label>
              <select id="personnal" value={selectedPersonnal} onChange={handlePersonnalChange}>
                <option value="">인원 수를 선택하세요</option>
                {personOptions.map((person, index) => (
                  <option key={index} value={person}>{person}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="calendar">시작 날짜:</label>
              <input type="date" id="calendar" value={selectedStartDate} onChange={handleStartDateChange} />
            </div>

            <div>
              <label htmlFor="calendar">종료 날짜:</label>
              <input type="date" id="calendar" value={selectedEndDate} onChange={handleEndDateChange} />
            </div>

            <button onClick={() => console.log(`검색: ${selectedRegion}, ${selectedPersonnal}, ${selectedStartDate}, ${selectedEndDate}`)}>
              검색
            </button>
          </div>



        필터 Section
          <div className="spacetitle">
            <label htmlFor="sort">정렬 기준: </label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="등록시간순">등록시간순</option>
              <option value="별점순">별점 순</option>
              <option value="이용횟수순">이용횟수 많은 순</option>
              <option value="가격낮은순">가격 낮은순</option>
            </select>
          </div>


        공간 열람 Section (무한페이지)
          <div className="spaces">
            {
              (spaceList) ? (
                spaceList.map((space, idx) => {
                  return (
                    <Space key={idx} space={space} />
                  )
                })
              ) : (null)
            }
          </div>
        </div>

      </div>
    )
  }

export default SpaceList;