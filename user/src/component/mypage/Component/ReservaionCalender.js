import React, { useEffect, useState } from 'react';
import moment from 'moment';

import CalendarAdd from './CalendarAdd';
import jaxios from '../../../util/jwtUtil';
import { useSelector } from 'react-redux';

function ReservationCalendar() {
  const user = useSelector(state=>state.user);
  const [month, setMonth] = useState("");
  const [year, setyaer] = useState("");
  const [dayList , setDayList] = useState([]);

  useEffect(()=>{
    console.log(year+"-"+month+"월");
    if(year)getReservationList();
  },[year,month])
   

  let getReservationList = async()=>{
    try{
      let result = await jaxios.get("/api/reservation/getReservationList",{params:{year,month,userid:user.userid}});
      console.log(result.data);
      setDayList(prev => [...result.data])
    }catch(err){
      console.error(err);
    }
  }


  return (
    <div className='recentreservation calendarContainer'>
      <div className='title'>
        
        <h2>{year}년 {month}월 내 예약({dayList.length})</h2>
      </div>
      <div>
       
        <CalendarAdd setMonth={setMonth} dayList={dayList} setyaer={setyaer} />
      </div>
    </div>
  );
}

export default ReservationCalendar;
