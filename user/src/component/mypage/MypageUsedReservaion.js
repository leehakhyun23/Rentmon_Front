import React, { useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


function MypageUsedReservaion({record,num}) {
    const navigate = useNavigate();
    const [rating, setRating] = useState([]);
    useEffect(()=>{
        setRating([]);
        let rating=(record.reveiwreater);
        for(let i =0; i < 5; i++){
            if(rating>0) setRating(prev=>[...prev, true]);
            else setRating(prev=>[...prev, false]);
            rating--;
        }
    },[record]);
    let reservation = record.reservation;
    function dayFormat(date){
        let datearr = date.split(" ")[0].split("-");
        return(datearr[0]+"년 "+Number(datearr[1])+"월 " + Number(datearr[2])+"일" + " " +  date.split(" ")[1]);
    }
  return (
    <div>
        <div className='recentresevation-component' style={{cursor:"pointer"}} onClick={()=>{navigate(`/spaceDetail/${reservation.space.sseq}`)}}>
            <div className="recentresevation-container"  >
                <div className='top'><span>No. {num}</span><p>{dayFormat(reservation.reservestart)}~{dayFormat(reservation.reserveend)}</p></div>
                <div className='recentresevation-wrapper'>
                    <div className='img-box'>
                        <img src={`http://localhost:8070/space_images/${reservation.space.spaceimage[0].realName}`} alt={reservation.space.spaceimage[0].realName}/>
                    </div>
                    <div className='placeInfo'>
                        <div>
                            <span>{reservation.space.title}</span>
                            <img src='/img/peopleIcon.svg' alt='peple'/>&nbsp; - &nbsp;<small>{reservation.space.maxpersonnal}명</small>
                        </div>
                        <span className='content'>{reservation.space.content}</span>
                        <span className='price'>{(new Intl.NumberFormat('ko-KR').format(reservation.payment))} 원</span>
                        
                    </div>
                </div>
            </div>
            <div className='reviewContianer'>
                <div>
                    {(record.writereview)&&(<span>내가 준 별점</span>)}
                    {(record.writereview)?(
                        rating.map((elem,key)=>{
                            if(elem ==true) return <FaStar key={key} className='fullstart'/>
                            else return <FaRegStar key={key}/>   
                        })
                    ):<>
                        <p>리뷰를 아직 안쓰셨네요!<br/> 지금 리뷰 쓰러가보세요.</p>
                        <Link to="">자세히 보기 &gt;</Link>
                    </>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MypageUsedReservaion
