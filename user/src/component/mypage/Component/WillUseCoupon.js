import React, { useEffect, useId, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { dayFormat } from '../../../util/formatDate';
import jaxios from '../../../util/jwtUtil';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar } from 'swiper/modules';


function WillUseCoupon({userid}) {
    const [coupon, setCoupon] = useState([]);
    const [count, setCount] = useState(0);
    const [recentcp,setRecentcp]=useState(0);
    const now = new Date();
    const nowplus = new Date(now).setDate(now.getDate()+3);
    useEffect(()=>{
        getCouponlist();
    },[userid]);
    useEffect(()=>{
        setRecentcp(0);
        for(let x of coupon){
            if(getDate(x.limitdate) <= nowplus) setRecentcp(prev=>prev+1);
        }
    },[coupon]);
    let getCouponlist = async()=>{
        try{
            let result = await jaxios.get("/api/reservation/getMypageCouponList/"+userid);
            setCoupon(result.data.list);
            setCount(result.data.count);
        }catch(err){console.error(err);}
    }
    function getDate(day){
        return new Date(day);
    }

    function couponImgColor(price){
        if(price < 5000){
            return "/img/CouponImg.png";
        }else if(price >= 5000 && price <10000){
            return "/img/CouponImg2.png";
        }else if(price >= 10000) return "/img/CouponImg3.png";
    }
    return (
        <div className='useWillcoupon'>
            <div className='title'>
                
                <div className='tooltipwrap'>
                    {(recentcp > 0)&&(<div className='tooltip'>사용기한이 3일 이하로 남은 쿠폰이 {recentcp}개 있습니다.</div>)}
                    <img src='/img/tootipIcon.svg' alt='tootipIcon.svg'/>
                </div>
                <h2>쿠폰({count})</h2>
            </div>
            <div className='couponList'>
                {(count>0)?(
                    <Swiper
                        slidesPerView={window.innerWidth < 750 ? 1.5 :4.5}
                        spaceBetween={10}
                        freeMode={true}
                        scrollbar={{
                            hide: false,
                        }}
                        modules={[FreeMode, Scrollbar]}
                        className="mySwiper" >
                            {(coupon)&&(coupon.map((elem, key)=>{
                                return <SwiperSlide key ={key}>
                                    <div className='innerSwiper'>
                                    <div><img src={couponImgColor(elem.discount)} alt='CouponImg'/><span>{new Intl.NumberFormat("Ko-kr").format(elem.discount)}원</span></div>
                                    <p>{elem.couponTitle}</p>
                                    <p style={{color:"#9999"}}>{elem.couponstr}</p>
                                    {(getDate(elem.limitdate) <= nowplus)?(<span className='red'>~{dayFormat(elem.limitdate)}</span>):(<span>~{dayFormat(elem.limitdate)}</span>)}
                                </div>
                                </SwiperSlide>
                            }))}
                    </Swiper>
                ):(<p className="notcoupon">사용가능한 쿠폰이 없습니다.</p>)}
                
            </div>
        </div>
    )
}

export default WillUseCoupon
