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
            {<Slider {...settings}  >
                {
                    (props.space.spaceimage) ? (
                        props.space.spaceimage.map((image, idx) => {
                            return (
                                <img key={idx} src={`http://localhost:8070/space_images/${image.realName}`} alt={props.space.title} onClick={() => { navigate(`/spaceDetail/${props.space.sseq}`) }}/>
                            )
                        })
                    ) : (null)
                }
            </Slider>}
            <div className="spaceTitle">제목</div>
            <div className="spaceContent"> {props.space.sseq}. {props.space.title} </div>
            <div className="spaceTitle">가격</div>
            <div className="spaceContent"> {props.space.price}/시간</div>
            <div className="spaceTitle">위치</div>
            <div className="spaceContent">{props.space.province} {props.space.town}</div>

            <div className="spaceTitle">별점 / 총리뷰수 / 찜수</div>
            <div className="spaceContent">


            </div>

        </div>
    )
}

export default Space
