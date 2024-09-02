import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchAddressToCoordinatereturn } from '../../../util/NaverMap';

function RecentReservation({rs , setMypagePopup}) {
  

  function dateFormat(date){
      if (date) {
        
        let datearr = date.split(" ")[0].split("-");
        return(datearr[0]+"년 "+Number(datearr[1])+"월 " + Number(datearr[2])+"일 "+date.split(" ")[1]);
    }
  }
   
  return (
    <div className='recentresevation-container'>
      {(rs && rs.reservedate)?(
        <>
          <h3>곧 다가오는 예약</h3>
          <div className='recentresevation-wrapper'>
            <div className='img-box'>
                  <img src={"http://rentmon-jb.s3.ap-northeast-2.amazonaws.com/space_images/"+rs.savefilename} alt={rs.savefilename}/>
              </div>
              <div className='placeInfo'>
                  <span>{rs.title}</span>
                  <div>
                      <img src='/img/peopleIcon.svg' alt='peple'/> - {rs.count}명
                  </div>
              </div>
            </div>
            <div className='yearContainer'>
            <div>
            <p>{dateFormat(rs.reservedate) }</p>
                <div>
                      {rs.weather &&  (
                        <div>
                          <img src={rs.weather.icon} alt={rs.weather.icon}/>
                          <span>({rs.weather.description} - <small>{rs.weather.temp}°C</small>) 확률이 높아요.</span>
                        </div>
                      )}
                </div>
                
            </div>
            <div className='gobtn'>
                <Link to={"/mypage/dashboard"} onClick={()=>{setMypagePopup(false)}}><img src='/img/reservarrow.png' alt='reservarrow.png'/></Link>
            </div>
        </div>
        </>
      ):(<>
        <div id="notreserve" style={{padding:"20px 0", textAlign:"center" , color:"#999"}}>
          3일 이내에 등록된 예약이 없습니다.
        </div>
      </>)
      }
      
        
    </div>
  )
}

export default RecentReservation
