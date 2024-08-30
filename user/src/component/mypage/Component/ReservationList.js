import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import jaxios from '../../../util/jwtUtil';
import MypagePaging from './MypagePaging';
import ReservModal from './ReservModal';
import ReseveListComponent from './ReseveListComponent';

function ReservationList() {
    let user = useSelector(state => state.user);
    const [list, setList] = useState([]);
    const [page ,setPage] = useState({});
    const [modalon, setModalon] =useState(false);
    const [rerveData , setReservData] = useState({});
    const {currentPage} = useParams();

    useEffect(()=>{
        getReservation(currentPage);
    },[user, currentPage]);

    let getReservation=async(n)=>{
       try{
        let result = await jaxios.get("/api/reservation/getReservationList/"+user.userid,{params:{page:n}});
       setList(result.data.list);
       setPage(result.data.paging);
       }catch(err){console.error(err);}
    };
  return (
    (list)&&(
        <div className='reservationList'>
            <div className='title'>
                <h2>예약 리스트 ({page.recordAllcount})</h2>
            </div>
            <div className='content'>
                {(list.length==0)&&(<p style={{fontSize:"15px",padding:"60px 20px", border:"1px solid #ddd", textAlign:"left", color:"#999" ,borderRadius:"9px" , margin:"50px 0"}}>예약내역이 없습니다.</p>)}
                {(list.map((elem, key)=>(<ReseveListComponent record={elem} key={key} num ={page.lastnum-key} setReservData={ setReservData}  setModalon={setModalon}/>)))}
            </div>
            <div className='paganation'>
                <MypagePaging page={page} url={"/mypage/reservation/"}/>
            </div>
            <ReservModal modalon={modalon} setModalon={setModalon} rerveData={rerveData} />
        </div>
    )
  )
}

export default ReservationList
