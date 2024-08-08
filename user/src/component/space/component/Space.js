import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


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



    return (
        <div className="space">
            {<Slider {...settings} >
                {
                    (props.space.spaceImages) ? (
                        props.space.spaceImages.map((image, idx) => {
                            return (
                                <img key={idx} src={`http://localhost:8070/space_images/${image.originame}`} alt={props.space.title} />
                            )
                        })
                    ) : (null)
                }
            </Slider>}
            <span onClick={() => { navigate(`/spaceDetail/${props.space.sseq}`) }}> {props.space.sseq}. {props.space.title}</span><br />
            <span> 내용 : {props.space.content}</span><br />
            <span> 가격 : {props.space.price}</span><br />
            {/* 해시태그 조회 */}
            <div>
                <h3>해시태그:</h3>
                {props.space.spaceHashTags && props.space.spaceHashTags.length > 0 ? (
                    <ul>
                        {props.space.spaceHashTags.map((hashTag, tagIdx) => (
                            <li key={tagIdx}>
                                {hashTag.word}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span>해시태그가 없습니다.</span>
                )}
            </div>
            <br /><br /><br />
        </div>
    )
}

export default Space
