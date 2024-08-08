import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Space from './component/Space';
import SpaceMenu from './component/SpaceMenu';
import SpaceContent from './component/SpaceContent';
import SpaceFacility from './component/SpaceFacility';
import SpaceCaution from './component/SpaceCaution';
import Map from './component/Map';
import SpaceChat from './component/SpaceChat';
import Review from './component/Review';
import Remocon from './component/Remocon';





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
      <Remocon />
      <div>
        <Space space={space} />
        <SpaceMenu />
        <SpaceContent />
        <SpaceFacility />
        <SpaceCaution />
        <Map />
        <SpaceChat />
        <Review />
      </div>
    </div>

  )
}

export default SpaceDetail
