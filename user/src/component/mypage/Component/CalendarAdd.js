import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import Calendar from 'react-calendar';
import ReservModal from './ReservModal';

function CalendarAdd({setMonth ,dayList , setyaer }) {

    const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜
    const activeDate = moment(value).format('MM'); // 클릭한 날짜 (년-월-일)
    const activeYear = moment(value).format('YYYY'); // 클릭한 날짜 (년-월-일)
    const monthOfActiveDate = moment(value).format('YYYY-MM');
    const [modalon, setModalon] =useState(false);
    const [rerveData , setReservData] = useState({});

    useEffect(()=>{
        setyaer(activeYear);
        setMonth(parseInt(activeDate,10));
    },[]);

    const getActiveMonth = (activeStartDate) => {
        const newActiveMonth = moment(activeStartDate).format('MM');
        const newActiveYear = moment(activeStartDate).format('YYYY');
        setMonth(parseInt(newActiveMonth,10));
        setyaer(newActiveYear);
    };

    // 각 날짜 타일에 컨텐츠 추가
    const addContent = useCallback (({ date }) => {
      if(dayList.length <=0) return false; 
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const contents = [];
    
        // dayList에서 해당 날짜와 일치하는 모든 항목을 찾습니다.
        const matchingDays = dayList.filter((day,idx) => {
          let start = new Date(day.reservestart.split(" ")[0]+"T00:00:00");
          let end = new Date(day.reserveend.split(" ")[0]+"T23:59:59");
          let formdate = new Date(formattedDate + 'T10:00:00');
          return start <= formdate && formdate <= end;
        } );
        // console.log(matchingDays);
        // 일치하는 항목의 수만큼 "선택" 요소를 추가합니다.
        
        matchingDays.forEach((elem,idx) => {
          let idxnum;
          dayList.filter((elem2,index)=>{
            if(elem.rseq == elem2.rseq){
              idxnum = index
              return index;
            };
          });
          contents.push(<div className={`reserv${idxnum}`} key={`${formattedDate}-${contents.length}`} onClick={(e)=>{
            setModalon(true);
            setReservData(dayList[idxnum]);
          }}>{elem.space.title}</div>);
        });
    
        return <div>{contents}</div>;
    },[dayList]);

    useEffect(()=>{
      dayList.forEach((elem, idx)=>{
        if(document.querySelectorAll(".reserv"+idx).length > 1){
          document.querySelectorAll(".reserv"+idx).forEach((el)=>{
            el.style.order="0";
          })
        }
      })
    },[dayList]);

    
  return (
    <div>

       <Calendar 
          locale="en-US"  // 한국어로 설정
          onChange={onChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
          tileContent={addContent}
          showNeighboringMonth={false}
          onActiveStartDateChange={({ activeStartDate }) => getActiveMonth(activeStartDate)}

        />
        
         <ReservModal modalon={modalon} setModalon={setModalon} rerveData={rerveData} />
    </div>
  )
}

export default CalendarAdd
