import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


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

    useEffect(()=>{
        setSpace(props.spaceDTO.space);
    }, [])



    return (
        <div className="space">
            {<Slider {...settings}  >
                {
                    (space.spaceimage) ? (
                        space.spaceimage.map((image, idx) => {
                            return (
                                <img key={idx} src={`https://final-kimminju.s3.ap-northeast-2.amazonaws.com/space_images/${image.realName}`} alt={props.space.title} onClick={() => { navigate(`/spaceDetail/${props.space.sseq}`) }}/>
                            )
                        })
                    ) : (null)
                }
            </Slider>}
            <div className="spaceTitle" onClick={() => { navigate(`/spaceDetail/${props.space.sseq}`) }}>제목</div>
            <div className="spaceContent"> {space.sseq}. {space.title} </div>
            <div className="spaceTitle">가격</div>
            <div className="spaceContent"> {props.space.price}/시간</div>
            <div className="spaceTitle">위치</div>
            <div className="spaceContent">{props.space.province} {props.space.town}</div>

            <div className="spaceTitle">별점 / 총리뷰수 / 찜수</div>
            <div className="spaceContent"></div>

            <div className="spaceTitle">해시태그</div>
            <div className="spaceContent">
                {
                    (props.space.hashtags) ? (
                        props.space.hashtags.map((tag, idx) => {
                            return (
                               <div className="tag">{tag.hseq.word}</div>
                            )
                        })
                    ) : (null)
                }
            </div>

        </div>
    )
}

export default Space
