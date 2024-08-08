import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

import Space from './component/Space';
import Search from './component/Search';
//import Map from './component/Map';
import Filter from './component/Filter';

//import Space from './component/Space';




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
  // let loginUser = useSelector(state => state.user);
  const [spaceList, setSpaceList] = useState([]);
  const [paging, setPaging] = useState({});
  const [word, setWord] = useState(null);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 확인 절차??

    // 검색어 기능 추가 필요
    axios.get('/api/space/getSpaceList')
      .then((result) => {
        setSpaceList(result.data);
        console.log('spaceList', result.data);
        // setPaging(result.data.paging);
      })
      .catch((err) => { console.error(err) })

  }, [])

  return (
    <div className='innerContainer'>
      <div>

        <Search />
      
        <Filter />


        <div className="spaces">
          {
            (spaceList) ? (
              spaceList.map((space, idx) => {
                return (
                  <Space key={idx} space={space}/>
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