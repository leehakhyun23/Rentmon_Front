import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import '../style/space.css';

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

function Space(props) {
    const [space, setSpace] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();



    return (
        <div className="space">
            {<Slider {...settings} >
                {
                    (props.space.images) ? (
                        props.space.images.map((image, idx) => {
                            return (
                                <img key={idx} src={`http://localhost:8070/space_images/${image.realName}`} alt={props.space.title} />
                            )
                        })
                    ) : (null)
                }
            </Slider>}
            <span onClick={() => { navigate(`/spaceDetail/${props.space.sseq}`) }}> 제목 : {props.space.sseq}. {props.space.title}</span><br />
            <span> 부제 : {props.space.subtitle}</span><br />
            <span> 가격 : {props.space.price}</span><br />
            <span> 위치 : {props.space.province} {props.space.town}</span>
            <span> 시간 : {props.space.starttime}시 ~ {props.space.endtime}시</span>
            <span> 최대인원수 : {props.space.maxpersonnal}인 </span>
            <span> 별점 / 총 리뷰수 : </span>
            <span> 찜수 : </span>
        </div>
    )
}

export default Space
