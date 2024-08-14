import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import SpaceInfo from './component/SpaceInfo';
import SpaceMenu from './component/SpaceMenu';
import SpaceChat from './component/SpaceChat';
import Review from './component/Review';

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const settings = {
  dot: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

function SpaceDetail() {
  const [space, setSpace] = useState({});
  const navigate = useNavigate();
  const { sseq } = useParams();

  useEffect(
    () => {
      axios.get(`/api/space/getSpace/${sseq}`)
        .then((result) => {
          setSpace(result.data);
        })
        .catch((err) => { console.error(err) })

    }, []
  )


  return (
    <div className='innerContainer'>
      <div>
      <SpaceMenu />

        공간 Detail Section
        <SpaceInfo space={space} />
        <SpaceChat />
        <Review space={space} />
        <button onClick={()=>{navigate(`/ReservationForm/${space.sseq}`)}}></button>
      </div>
    </div>

  )
}

export default SpaceDetail
