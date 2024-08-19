import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import jaxios from '../../../util/jwtUtil';
import MypagePaging from './MypagePaging';
import UsedCouponComponent from './UsedCouponComponent';

function UsedCoupon({userid}) {
    const [coupon, setCoupon] = useState([]);
    const [page, setPage] = useState({});
    const {currentPage} = useParams();
    const [begin,setBegin] =useState(0);
    useEffect(()=>{
        getCouponlist();
    },[userid]);
    let getCouponlist = async()=>{
        try{
            let result = await jaxios.get("/api/reservation/getMypageUsedCouponList/"+userid,{params:{page:currentPage}});
            console.log(result.data);
            setCoupon(result.data.list);
            setPage(result.data.paging);
            setBegin(result.data.paging.recordAllcount - (result.data.paging.recordrow*(result.data.paging.currentPage-1)));
        }catch(err){console.error(err);}
    }
    return (
        <div className='usedcoupon'>
            <div className='title'>
                <h2>지나간 쿠폰</h2>
            </div>
            <div className='couponList'>
                <div className='row title'>
                    <UsedCouponComponent num={"no."} title={"쿠폰 이름"} lastDate={"마감 날짜"} useyn={"사용 유무"} />
                </div>
                {(coupon) ?(
                    coupon.map((elem, key)=>(
                        <div className='row' key={key}>
                            <UsedCouponComponent num={begin-key} title={elem.couponstr}  lastDate={elem.limitdate} useyn={elem.useyn} />
                        </div>
                    ))
                ):""}
            </div>
            <div className='paganation'>
                <MypagePaging page={page} url={"/mypage/coupon/"}/>
            </div>
        </div>
    )
}

export default UsedCoupon
