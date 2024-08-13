import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ReservationComponent from './ReservationComponent';

function RecentReservation() {
    let recent =useSelector(state => state.recent);
    const [recentReservationData , setRecentReservationData] = useState({});
    useEffect(() => {
      if (!recent.recentReserve) return;
      let recentrv = recent.recentReserve;
      console.log(recentrv);
      setRecentReservationData({
        savefilename: recentrv.spaceimage[0]?.realName || '',
        title: recentrv.space?.title || '',
        count: recentrv.space?.personnal || 0,
        reservedate: recentrv.reservestart || '',
        weather : recent.weather || "",
        content : recentrv.space.content
      });
    }, [recent]); 
  return (
    <div className='recentreservation'>
        <div className='title'>
            <img src='/img/tootipIcon.svg' alt='tootipIcon.svg'/>
            <h2>최근 다가온 예약</h2>
        </div>
        <div>
            <ReservationComponent rs={recentReservationData}/>
        </div>
    </div>
  )
}

export default RecentReservation
