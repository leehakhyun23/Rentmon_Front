import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Space from '../space/Space';

/* 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

*/

function SpaceList() {
  //let loginUser = useSelector(state => state.user);
  const [spaceList, setSpaceList] = useState([]);
  const [paging, setPaging] = useState({});
  const [word, setWord] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    () => {
      // 로그인 확인 절차??

      axios.get('/api/space/getSpaceList', { params: { word } })
        .then((result) => {
          setSpaceList(result.data.spaceList);
          console.log('spaceList', result.data.spaceList);
          // setPaging( result.data.paging);
        })
        .catch((err) => { console.error(err) })

    }, [word]
  )



  return (
    <div className='innerContainer'>
      <div>
        <h2>검색창 2순위</h2>
        <h2>지도기능 5순위</h2>
        <h2>정렬기능 3순위</h2>

        <br />
        <br />
        <br />
        <h2>space 조회 1순위</h2>
        <h2>해쉬태그 조회, 이미지 조회 2순위</h2>
        {/* <div className="Spaces">
          {
            (spaceList)?(
              spaceList.map((space, idx)=>{
                return(
                  <Space key={idx} space={space} spaceid={space.id} loginUser={loginUser} />
                )
              })
            ):(null)
          }
        </div> */}
      </div>
      <br />
      <br />
      <br />






      <h2>스크롤 페이징 4순위</h2>

      <h2>채팅창 가기, 찜하기, 신고하기</h2>


    </div>
  )
}

export default SpaceList
