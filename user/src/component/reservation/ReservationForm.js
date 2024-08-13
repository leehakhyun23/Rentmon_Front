import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import './style/reservation.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


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

function ReservationForm({ props }) {
    let user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [space, setSpace] = useState({});
    const { sseq } = useParams(); // URL 파라미터에서 공간 고유 ID 받기
    const location = useLocation();
    const { startDate, startTime, endTime } = location.state || {}; // 상태에서 날짜와 시간 정보 받기

    const [userInfo, setUserInfo] = useState({});  // 예약자 정보
    const [purpose, setPurpose] = useState('');    // 사용 목적
    const [request, setRequest] = useState('');    // 요청 사항


    const handleSubmit = (e) => {
        e.preventDefault();

        const reservationData = {
            startDate: startDate,
            startTime: startTime,
            endTime: endTime,
        };

        onSubmit(reservationData);
    };

    const onSubmit = () => { }

    useEffect(
        () => {
            axios.get(`/api/space/getSpace/${sseq}`)
                .then((result) => {
                    setSpace(result.data);
                })
                .catch((err) => { console.error(err) })

        }, []
    )

    const calculateTotalPrice = () => {
        // 사용 시간 계산 (시작 시간과 종료 시간을 토대로)
        const start = new Date(`2024-01-01T${startTime}:00`);
        const end = new Date(`2024-01-01T${endTime}:00`);
        const hours = (end - start) / (1000 * 60 * 60);
        return hours * space.price;
    };




    return (
        <div className="reservation-form-container">
            <div className="space-info">
                <Slider {...settings}>
                    {space.images && space.images.map((image, idx) => (
                        <img key={idx} src={`http://localhost:8070/space_images/${image.originName}`} alt={space.title} />
                    ))}
                </Slider>
                <h2>{space.title}</h2>
                <p>{space.content}</p>
                <p>가격: {space.price}원/시간</p>
            </div>

            <div className="reservation-details">
                <h3>예약 정보</h3>
                <p>예약 날짜: {startDate}</p>
                <p>시작 시간: {startTime}</p>
                <p>종료 시간: {endTime}</p>
                <label>예약 인원: <input type="number" min="1" max="10" /></label>
            </div>

            <div className="user-info">
                <h3>예약자 정보</h3>
                <p>이름: {user.name}</p>
                <p>이메일: {user.email}</p>
                <p>전화번호: {user.phone}</p>
                <label>사용 목적: <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} /></label>
                <label>요청 사항: <input type="text" value={request} onChange={(e) => setRequest(e.target.value)} /></label>
            </div>

            <div className="host-info">
                <h3>호스트 정보</h3>
                <p>{space.hostName}님</p>
                <p>연락처: {space.hostPhone}</p>
            </div>

            <div className="reservation-notes">
                <h3>예약 주의 사항</h3>
                <p>여기에 예약 관련 주의 사항을 기재하십시오...</p>
            </div>

            <div className="payment-info">
                <h3>결제 정보</h3>
                <p>총 결제 금액: {calculateTotalPrice()}원</p>
                <label>결제 수단:
                    <label><input type="radio" name="payment" value="card" /> 신용카드</label>
                    <label><input type="radio" name="payment" value="paypal" /> PayPal</label>
                </label>
            </div>

            <div className="agreement">
                <h3>동의 사항</h3>
                <label><input type="checkbox" /> 위 공간의 예약조건 확인 및 결제진행 동의</label>
                <label><input type="checkbox" /> 환불규정 안내에 대한 동의</label>
                <label><input type="checkbox" /> 개인정보 제3자 제공 동의</label>
                <label><input type="checkbox" /> 개인정보 수집 및 이용 동의</label>
                <label><input type="checkbox" /> 전체 동의</label>
            </div>

            <button className="submit-button" onClick={handleSubmit}>결제하기인데 일단은 생략하고 예약하기</button>
        </div>
    );
}

export default ReservationForm;