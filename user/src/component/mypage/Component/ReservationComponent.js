import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dayFormat } from '../../../util/formatDate'

function ReservationComponent({rs}) {
  

  return (
    <div className='recentresevation-component'>
      {(rs && rs.reservedate)?(
        <>
          <div className='recentresevation-wrapper'>
            <div className='img-box'>
                  <img src={"http://localhost:8070/space_images/"+rs.savefilename} alt={rs.savefilename}/>
              </div>
              <div className='placeInfo'>
                   <div>
                      <span>{rs.title}</span>
                      <img src='/img/peopleIcon.svg' alt='peple'/>&nbsp; - &nbsp;<small>{rs.count}명</small>
                  </div>
                  <span className='content'>{rs.content}</span>
                  <span className='price'>{(new Intl.NumberFormat('ko-KR').format(rs.price))} 원</span>
                  
              </div>
            </div>
            <div className='yearContainer'>
            <div>
                <p>{dayFormat(rs.reservedate) +"~"+ dayFormat(rs.reserveend)}</p>
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
            3일 이내에 등록된 예약이 없습니다.
        </div>
      </>)
      }
      
        
    </div>
    )
}

export default ReservationComponent
