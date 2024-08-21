import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Calendar from "react-calendar";

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
    const [request, setRequest] = useState('');    // 요청 사항
    const [payment, setPayment] = useState();

    // 시간값
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(1);
    const [startTimestamp, setStartTimestamp] = useState();
    const [endTimestamp, setEndTimestamp] = useState();
    const [reserveTime, setReserveTime] = useState();
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00:00`);

    const handleDateChange = (newDate) => {
        // Date 객체에서 년, 월, 일 추출
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리 수로 변환
        const day = String(newDate.getDate()).padStart(2, '0'); // 두 자리 수로 변환

        // YYYY-MM-DD 형식의 문자열로 변환
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
        setStartTime("");
        setEndTime("");

        console.log("Formatted Date:", formattedDate); // 출력 예: 2024-08-19
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
        const timestamp = `${date} ${event.target.value}`;
        setStartTimestamp(timestamp);


    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
        const timestamp = `${date} ${event.target.value}`;
        setEndTimestamp(timestamp);
        // 바로 예약 시간을 계산하고 결제 금액을 계산합니다.
        const calculatedReserveTime = calculateTimeDifference(startTimestamp, endTimestamp);
        const calculatedPayment = calculatedReserveTime * space.price;

        setReserveTime(calculatedReserveTime);  // 필요하면 상태로도 저장
        setPayment(calculatedPayment);          // 필요하면 상태로도 저장

    };

    useEffect(() => {
        if (startTimestamp && endTimestamp) {
            const calculatedReserveTime = calculateTimeDifference(startTimestamp, endTimestamp);
            setReserveTime(calculatedReserveTime);
            setPayment(calculatedReserveTime * space.price);

            console.log("Reserve Time:", calculatedReserveTime);
            console.log("Payment:", calculatedReserveTime * space.price);
        }
    }, [startTimestamp, endTimestamp, space.price]);


    function calculateTimeDifference(startDateStr, endDateStr) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const differenceInMilliseconds = endDate - startDate;
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        return differenceInHours;

    }

    const handleSubmit = () => {
        if (!date || !startTime || !endTime) {
            alert("예약 날짜와 시간을 지정해주세요.");
            return;
        }

        const calculatedReserveTime = calculateTimeDifference(startTimestamp, endTimestamp);

        // endTime이 startTime보다 큰 경우에만 예약을 진행합니다.
        if (calculatedReserveTime <= 0) {
            alert("종료 시간이 시작 시간보다 늦어야 합니다.");
            return;
        }



        // 예약 데이터를 서버로 전송
        const reservationData = {
            reservestart: startTimestamp,
            reserveend: endTimestamp,
            request: request,
            payment: payment,
            user: { userid: user.userid }, // 올바른 형식의 객체로 감싸기
            space: { sseq: space.sseq } // 올바른 형식의 객체로 감싸기
        };

        console.log(reservationData);

        axios.post(`/api/reservation/InsertReservation`, reservationData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                alert('예약에 성공했습니다.');
                navigate(`/reservation/ReservationDone/${space.sseq}`);  // 예약 성공 후 이동할 페이지
            })
            .catch(error => {
                console.log(space);
                console.error('예약에 실패했습니다.', error);
            });
    };


    const onSubmit = () => { }

    // Space 조회
    useEffect(
        () => {
          axios.get(`/api/space/getSpace/${sseq}`)
            .then((result) => {
              setSpace(result.data.space);
            })
            .catch((err) => { console.error(err) });
        }, []
      )




    return (
        <div className="reservation-form-container">
            <div className="reservation-calendar">
                <div>
                    <Calendar onChange={handleDateChange} value={date} />
                    {date && (
                        <>
                            <div>
                                <label>Start Time:</label>
                                <select value={startTime} onChange={handleStartTimeChange}>
                                    <option value="">Select start time</option>
                                    {hours.map((hour, index) => (
                                        <option key={index} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>End Time:</label>
                                <select value={endTime} onChange={handleEndTimeChange}>
                                    <option value="">Select end time</option>
                                    {hours.map((hour, index) => (
                                        <option key={index} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleSubmit}>Reserve</button>
                        </>
                    )}
                </div>

            </div>



            <div className="space-info">
                <Slider {...settings}>
                    {space.images && space.images.map((image, idx) => (
                        <img key={idx} src={`http://localhost:8070/space_images/${image.originame}`} alt={space.title} />
                    ))}
                </Slider>
                <h2>{space.title}</h2>
                <p>{space.content}</p>
                <p>가격: {space.price}원/시간</p>
            </div>

            <div className="reservation-details">
                <h3>예약 정보</h3>
                <p>예약 날짜: {date}</p>
                <p>시작 시간: {startTime}</p>
                <p>종료 시간: {endTime}</p>
                <p>공간 주의 사항 : {space.caution}</p>
            </div>

            <div className="user-info">
                <h3>예약자 정보</h3>
                <p>이름: {user.name}</p>
                <p>이메일: {user.email}</p>
                <p>전화번호: {user.phone}</p>
                <label>요청 사항: <input type="text" value={request} onChange={(e) => setRequest(e.target.value)} /></label>
            </div>

            <div className="host-info">
                <h3>호스트 정보</h3>
                {/* <p>이름 : {space.host.hostid}</p>
                <p>연락처: {space.host.phone}</p>
                <p>이메일 : {space.host.email}</p> */}
            </div>

            <div className="payment-info">
                <h3>결제 정보</h3>
                <p>총 결제 금액: {payment}원</p>
                <label>결제 수단:
                    <label><input type="radio" name="payment" value="card" /> 신용카드</label>
                    <label><input type="radio" name="payment" value="paypal" /> PayPal</label>
                </label>
                <label>쿠폰 사용하기:
                    <label><input type="radio" name="payment" value="3000coupon" /> 3000원</label>
                    <label><input type="radio" name="payment" value="5000coupon" /> 5000원</label>
                    <label><input type="radio" name="payment" value="10000coupon" /> 10000원</label>
                </label>
            </div>

            <button className="submit-button" onClick={handleSubmit}>예약하기</button>
        </div>
    );
}

export default ReservationForm;