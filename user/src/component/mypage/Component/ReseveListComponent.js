import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { dayFormat } from '../../../util/formatDate';

function ReseveListComponent({record, num , setReservData , setModalon}) {
    let [dday, setDday]=useState("");
    useEffect(()=>{
        let nowdate = new Date(new Date);
        let now = new Date(new Date);
        now.setHours(0,0,0,0);
        let threeday = new Date(now);
        threeday.setDate(now.getDate()+3);
        let recoddate = new Date(record.reservestart);
        let recodenddata = new Date(record.reserveend);
        if(recoddate >= nowdate && recoddate <= threeday){
            const timeDiff = recoddate - now;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setDday(daysDiff-1);
        }else{
            setDday("");
        }
    },[record]);

  
  return (
    <div className='recentresevation-component' style={{order:dday , cursor:"pointer"}} onClick={()=>{setModalon(true); 
        setReservData(record); }} >
      {(dday !=="")&&(<div className='dday'>D-{dday}</div>)}
         <div className={`recentresevation-wrapper ${(dday !=="")&&("ddayplus")}`}  >
            <div className='img-box'>
                {(record.space.spaceimage[0])&&(<img src={`http://rentmon-jb.s3.ap-northeast-2.amazonaws.com/space_images/${record.space.spaceimage[0].realName}`} alt={record.space.spaceimage[0].realName}/>)}
              </div>
              <div className='placeInfo'>
                   <div>
                      <span>{record.space.title}</span>
                      <img src='/img/peopleIcon.svg' alt='peple'/>&nbsp; - &nbsp;<small>{record.space.maxpersonnal}명</small>
                  </div>
                  <span className='content'>{record.space.content}</span>
                  <span className='price'>{(new Intl.NumberFormat('ko-KR').format(record.payment))} 원</span>
                  
              </div>
        </div>
        <div className='yearContainer'>
            <div>
                <p>{dayFormat(record.reservestart)}~{dayFormat(record.reserveend)}</p>
            </div>
        </div>
    </div>
  )
}

export default ReseveListComponent
