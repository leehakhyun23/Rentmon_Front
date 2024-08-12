import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function RecentReservation({rs}) {
    const [dateFormat, setDateFormat] = useState("");
  
    useEffect(()=>{
        if (rs && rs.reservedate) {
            let datearr = rs.reservedate.split(" ")[0].split("-");
            setDateFormat(datearr[0]+"년 "+Number(datearr[1])+"월 " + Number(datearr[2])+"일");
    }
  },[rs]);

   
  return (
    <div className='recentresevation-container'>
      {(rs && rs.reservedate)?(
        <>
          <h3>곧 다가오는 예약</h3>
          <div className='recentresevation-wrapper'>
            <div className='img-box'>
                  <img src={"http://localhost:8070/space_images/"+rs.savefilename} alt={rs.savefilename}/>
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
                <p>{dateFormat}</p>
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
                <Link to={"/detailveiw/"+rs.seq}><img src='/img/reservarrow.png' alt='reservarrow.png'/></Link>
            </div>
        </div>
        </>
      ):(<>
        <div id="notreserve" style={{padding:"20px 0", textAlign:"center" , color:"#999"}}>
            현재 다가오는 예약이 없습니다.
        </div>
      </>)
      }
      
        
    </div>
  )
}

export default RecentReservation
