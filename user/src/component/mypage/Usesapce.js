import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import jaxios from '../../util/jwtUtil';
import MypagePaging from './Component/MypagePaging';
import MypageUsedReservaion from './MypageUsedReservaion';

function Usesapce() {
    const user = useSelector(state=>state.user);
    const [list, setList]=useState([]);
    const [page, setPage] = useState({});
    const [begin,setBegin] =useState(0);
    let {currentPage}=useParams();

    useEffect(()=>{
        getList();
    },[currentPage]);

    let getList=async()=>{
        try{
            let result = await jaxios.get("/api/reservation/getUsedReservation/"+user.userid,{params:{page:currentPage}});

            setList(result.data.list);
            setPage(result.data.paging);
            setBegin(result.data.paging.recordAllcount - (result.data.paging.recordrow*(result.data.paging.currentPage-1)));
        }catch(err){console.error(err);}
    }

    
    return (
        <div className='mypagecommon usedSpace'>
        <div className='title'>
            <h2>이용한 공간 ({page.recordAllcount})</h2>
        </div>
        <div className='content'>
            {(list.length>0)&&(
                list.map((elem, idx)=>{
                  return  <MypageUsedReservaion record={elem} num={begin-idx} key={begin-idx}/>
                })
            )}
            {(list.length==0)&&(
                (<p style={{fontSize:"15px",padding:"60px 20px", border:"1px solid #ddd", textAlign:"left", color:"#999" ,borderRadius:"9px" , margin:"50px 0"}}>사용했던 공간이 없습니다.</p>)
            )}
        </div>
        <div className='paganation'>
            <MypagePaging page={page} url={"/mypage/usesapce/"}/>
        </div>
        </div>
    )
}

export default Usesapce
