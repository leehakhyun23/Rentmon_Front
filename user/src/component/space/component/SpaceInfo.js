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
                                <img key={idx} src={`https://final-kimminju.s3.ap-northeast-2.amazonaws.com/space_images/${image.realName}`} alt={props.space.title} />
                            )
                        })
                    ) : (null)
                }
            </Slider>}
            <span onClick={() => { navigate(`/spaceDetail/${props.space.sseq}`) }}> {props.space.sseq}. {props.space.title}</span><br />

            <br /><br /><br />
            <div className="spacetitle">
                공간 소개
                <div className="spacecontent">
                    <span> 제목 : {props.space.title}</span><br />
                    <span> 내용 : {props.space.content}</span><br />
                    <span> 가격 : {props.space.price}</span><br />
                    <span> 주소 : </span><br />
                    <span> 시간 : </span>
                    <span> 해시태그들 : </span>


                </div>


            </div>
            <div className="spacetitle">
                공간 시설 안내
            </div>
            <div className="spacetitle">
                이용 시 주의사항
                <div className="spacecontent">
                    <span> 내용 : {props.space.caution}</span><br />
                </div>
            </div>
            <div className="spacetitle">
                위치정보
            </div>

            <div className='subPage'>
                <div className="customer" style={{ flex: "4" }}>
                    <div id='map' style={{ width: "600px", height: "400px", margin: "20px" }}></div>
                </div>
            </div>

            <button onClick={()=>{navigate(`/ReservationForm/${props.space.sseq}`)}}>예약하기</button>
        </div>

    )
}

export default SpaceInfo
