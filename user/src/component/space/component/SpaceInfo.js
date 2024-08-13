import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import '../style/space.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const { kakao } = window;

const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}
function SpaceInfo(props) {
    const [space, setSpace] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(
        () => {
            // 지도의 중심위치 설정이동
            const container = document.getElementById('map');
            const options = { center: new kakao.maps.LatLng(37.5718407, 126.9872086) };
            const kakaoMap = new kakao.maps.Map(container, options);
            // 표시지역 마킹
            const markerPosition = new kakao.maps.LatLng(37.5718407, 126.9872086);
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(kakaoMap);
        }, []
    )


    return (
        <div className="space">
            {<Slider {...settings} >
                {
                    (props.space.images) ? (
                        props.space.images.map((image, idx) => {
                            return (
                                <img key={idx} src={`http://localhost:8070/space_images/${image.originName}`} alt={props.space.title} />
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
                {props.space.hashtags && props.space.hashtags.length > 0 ? (
                    <ul>
                        {props.space.hashtags.map((hashTag, tagIdx) => (
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
            <div className="spacetitle">
                공간 소개
            </div>
            <div className="spacetitle">
                공간 시설 안내
            </div>
            <div className="spacetitle">
                이용 시 주의사항
            </div>
            <div className="spacetitle">
                위치정보
            </div>

            <div className='subPage'>
                <div className="customer" style={{ flex: "4" }}>
                    <div id='map' style={{ width: "600px", height: "400px", margin: "20px" }}></div>
                </div>
            </div>
        </div>

    )
}

export default SpaceInfo
