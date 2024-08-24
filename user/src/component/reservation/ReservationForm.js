import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Calendar from "react-calendar";

import './style/reservation.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// 이미지 슬릭을 위한 세팅
const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

function ReservationForm({ props }) {

    // 기본자원
    let user = useSelector(state => state.user);
    const [space, setSpace] = useState({});
    const [host, setHost] = useState({});
    const [reserveList, setReserveList] = useState([]);


    const navigate = useNavigate();
    const { sseq } = useParams(); // URL 파라미터에서 공간 고유 ID 받기

    // 예약에서 추가적으로 입력받을 내용
    const [request, setRequest] = useState('');    // 요청 사항
    const [payment, setPayment] = useState();


    // 시간값
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(1);
    const [startTimestamp, setStartTimestamp] = useState();
    const [endTimestamp, setEndTimestamp] = useState();
    const [reserveTime, setReserveTime] = useState();


    // Space 조회
    useEffect(
        () => {
            axios.get(`/api/space/getSpace/${sseq}`)
                .then((result) => {
                    setSpace(result.data.space);
                    // setHost(result.data.space.host);
                })
                .catch((err) => { console.error(err) });
        }, []
    )

    const getReserveInfo = () => {
        axios.get(`/api/reservation/getReservationListbyDate`, { params: { sseq, date } })
            .then((result) => {
                setReserveList(result.data.reservationList);
            })
            .catch((err) => { console.error(err) })
    }

    useEffect(() => {
        if (date) {
            getReserveInfo();
        }
    }, [date]);


    // 영업시간에 맞는 시간 범위 생성
    const generateHours = () => {
        if (!space.starttime || !space.endtime) return [];
        return Array.from({ length: space.endtime - space.starttime + 1 }, (_, i) => `${String(space.starttime + i).padStart(2, '0')}:00:00`);
    };

    const hours = generateHours();

    const [selectedPhase, setSelectedPhase] = useState("start"); // "start" 또는 "end" 상태 추적

    // 예약된 시간대에 따라 비활성화된 시간을 반환하는 함수
    const getDisabledHours = () => {
        const disabledHours = new Set();

        reserveList.forEach(reservation => {
            const startHour = new Date(reservation.reservestart).getHours();
            const endHour = new Date(reservation.reserveend).getHours();

            for (let i = startHour; i < endHour; i++) {
                disabledHours.add(`${String(i).padStart(2, '0')}:00:00`);
            }
        });

        console.log("disabledHours");
        console.log(disabledHours);

        return disabledHours;
    };

    const handleDateChange = (newDate) => {
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리 수로 변환
        const day = String(newDate.getDate()).padStart(2, '0'); // 두 자리 수로 변환

        // YYYY-MM-DD 형식의 문자열로 변환
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
        setStartTime(null);
        setEndTime(null);
        setStartTimestamp(null);
        setEndTimestamp(null);
        setSelectedPhase("start");
    };

    const disabledHours = getDisabledHours();

    const handleTimeSlotClick = (time) => {
        if (disabledHours.has(time)) return;  // 비활성화된 시간 클릭 방지

        if (selectedPhase === "start") {
            setStartTime(time);
            setStartTimestamp(`${date} ${time}`);
            setSelectedPhase("end");
        } else if (selectedPhase === "end") {
            if (new Date(`${date} ${time}`) <= new Date(startTimestamp)) {
                alert("종료 시간은 시작 시간보다 늦어야 합니다. 다시 선택해주세요.");
                return;
            }

            // Check if any disabled hour exists between startTime and endTime
            const startHour = new Date(startTimestamp).getHours();
            const endHour = new Date(`${date} ${time}`).getHours();
            const hasDisabledHour = Array.from({ length: endHour - startHour + 1 }, (_, i) => `${String(startHour + i).padStart(2, '0')}:00:00`).some(hour => disabledHours.has(hour));

            if (hasDisabledHour) {
                alert("선택한 시간 범위에 다른 예약된 시간이 포함되어 있습니다. 다른 시간을 선택해 주세요.");
                return;
            }



            setEndTime(time);
            setEndTimestamp(`${date} ${time}`);
            setSelectedPhase("start");
        }

        if (selectedPhase === "end" && startTimestamp) {
            const calculatedReserveTime = calculateTimeDifference(startTimestamp, `${date} ${time}`);
            setReserveTime(calculatedReserveTime);
            setPayment(calculatedReserveTime * space.price);
        }
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
                navigate(`/mypage/reservation/1`);  // 예약 성공 후 이동할 페이지
            })
            .catch(error => {
                console.log(space);
                console.error('예약에 실패했습니다.', error);
            });
    };

    return (

        <div className="reservationContainer">

            <div className="space-info">
                <Slider {...settings}>
                    {space.spaceimage && space.spaceimage.map((image, idx) => (
                        <img key={idx} src={`http://localhost:8070/space_images/${image.realName}`} alt={space.title} />
                    ))}
                </Slider>
                <div className="spaceContentBlock">
                    <div className="spaceTitle">제목</div>
                    <div className="spaceContent">{space.sseq}. {space.title}</div>
                </div>

                <div className="spaceContentBlock">
                    <div className="spaceTitle">부제목</div>
                    <div className="spaceContent">{space.subtitle}</div>
                </div>

                <div className="spaceContentBlock">
                    <div className="spaceTitle">내용</div>
                    <div className="spaceContent">{space.content}</div>
                </div>
            </div>

            <div className="reservationCalendar">
                <div className="spaceTitle">예약 시간 확정</div>
                <div>
                    <Calendar onChange={handleDateChange} value={date} tileDisabled={({ date }) => date < new Date()} />
                    <br></br>
                    {date && (
                        <div className="timeSelect">
                            <div className="time-buttons">
                                {hours.map((hour, index) => (
                                    <button
                                        key={index}
                                        className={`time-button ${disabledHours.has(hour) ? 'disabled' : ''} ${startTime === hour ? 'start-selected' : ''} ${endTime === hour ? 'end-selected' : ''}`}
                                        onClick={() => handleTimeSlotClick(hour)}
                                        disabled={disabledHours.has(hour)}  // 비활성화된 시간 클릭 방지
                                        style={disabledHours.has(hour) ? { backgroundColor: '#d3d3d3' } : {}}
                                    >
                                        {hour}
                                    </button>
                                ))}
                            </div>

                        </div>
                    )}

                    <label>요청 사항: <input type="text" value={request} onChange={(e) => setRequest(e.target.value)} /></label>

                </div>

            </div>


            <div className="reservation-info">
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
            </div>

            {/* <div className="host-info">
                <h3>호스트 정보</h3>
                <p>이름 : {host.hostid}</p>
                <p>연락처: {host.phone}</p>
                <p>이메일 : {host.email}</p>
            </div> */}

            <div className="payment-info">
                <h3>결제 정보</h3>
                <p>총 결제 금액: {payment}원</p>
            </div>

            <button className="getCoupon-button" >쿠폰 사용</button>
            <button className="submit-button" onClick={handleSubmit}>예약하기</button>
        </div>
    );
}

export default ReservationForm;