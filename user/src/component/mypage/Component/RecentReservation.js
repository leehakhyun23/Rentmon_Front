import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ReservationComponent from './ReservationComponent';

function RecentReservation() {
  
    let recent =useSelector(state => state.recent);
    const [recentReservationData , setRecentReservationData] = useState({});
    const [space , setSpace] =useState({});
    useEffect(() => {
      if (!recent.recentReserve) return;
      let recentrv = recent.recentReserve;
      
      setRecentReservationData({
        savefilename: recentrv.space.spaceimage[0]?.realName || '',
        title: recentrv.space?.title || '',
        count: recentrv.space?.maxpersonnal || 0,
        reservedate: recentrv.reservestart || '',
        reserveend: recentrv.reserveend || '',
        weather : recent.weather || "",
        content : recentrv.space.content || "",
        price :recentrv.payment || ""
      });
      setSpace(recentrv);
    }, [recent]); 
  return (
    <div className='recentreservation'>
        <div className='title'>
            <img src='/img/tootipIcon.svg' alt='tootipIcon.svg'/>
            <h2>최근 다가온 예약</h2>
        </div>
        <div>
            <ReservationComponent space={space} rs={recentReservationData}/>
        </div>
    </div>
  )
}

export default RecentReservation
