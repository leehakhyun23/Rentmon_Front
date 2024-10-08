import React, { useEffect, useState } from 'react'
import MypageIconButton from './MypageIconButton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jaxios from '../../../util/jwtUtil';
import { menucountAction } from '../../../store/RecentSlice';
import { getCookie } from '../../../util/cookieUtil';
import axios from 'axios';
function gradeText(n){
  if(n===1)return "브론즈"
  if(n===2)return "실버"
  if(n===3)return "골드"
  if(n===4)return "플레티넘"
  if(n===5)return "다이아몬즈"
}
function gradeimg(n){
  if(n===1)return "bronze.png"
  if(n===2)return "silver.png"
  if(n===3)return "gold.png"
  if(n===4)return "platinum.png"
  if(n===5)return "diamond.png"
}
function MyInfo({mypagePopup , user , setMypagePopup}) {
  let [recentview, setRecentview] = useState([]);
  const dispatch = useDispatch();
  const recent = useSelector(state=>state.recent);
  const menucount = recent.menucount;
  let [rctvw , setRctvw] =useState([]);
  

  useEffect(()=>{
    setRctvw(getCookie("rctvw"));
  },[mypagePopup]);
  useEffect(()=>{
    countArray();
    if(rctvw !== undefined){
      getspaceviewlist(rctvw);
    }
  },[rctvw]);
  let getspaceviewlist = async(rctvw)=>{
    try{
      let reuslt = await axios.post("/api/main/getspaceviewlist",rctvw);
      setRecentview(reuslt.data);
    }catch(err){ console.error(err.response?.data || err.message);}
  }

  let countArray =  async()=>{
    try{
      let result = await jaxios.get("/api/user/menucountarray" ,{params:{userid:user.userid}});
      dispatch(menucountAction({menucount:result.data}));
      
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className='myInfo'>
      <h3>내 정보</h3>
      <div className='myGrade'>
        <img src={'/img/'+gradeimg(user.gnum.gnum)} alt='bronze.png'/>
        <div>
            <span>{gradeText(user.gnum.gnum)}</span>
            <p>{(user.gnum<4)&&(`다음 단계는 ${gradeText(user.gnum+1)} 입니다.`)}</p>
        </div>
      </div>
      <div className='mypagemenu'>
        <MypageIconButton imglink = {"couponicon.svg"}  text = {`쿠폰(${menucount.couponCount})`} goLink={"/mypage/coupon/1"}/>
        <MypageIconButton imglink = {"calendaricon.svg"}  text = {`예약(${menucount.reservCount})`} goLink={"/mypage/reservation/1"}/>
        <MypageIconButton imglink = {"boxicon.svg"}  text = {`이용한 공간(${menucount.usesapceCount})`}  goLink={"/mypage/usesapce/1"}/>
        <MypageIconButton imglink = {"hearticon.svg"}  text = {`찜(${menucount.zzimCount})`}  goLink={"/mypage/zzim"}/>
        <MypageIconButton imglink = {"chaticon.svg"}  text = {`문의(${menucount.inquiryCount})`}  goLink={"/mypage/qna/1"}/>
      </div>
      {(rctvw)&&(

      <div className='recentViewSpace'>
        {(recentview)&&(<h3>최근 본 공간({rctvw.length})</h3>)}
      
          <Swiper
            slidesPerView={2.5}
            spaceBetween={12}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {(recentview)&&(recentview.map((elem, idx)=>(
               <SwiperSlide key={idx}><Link value={idx} to={"spaceDetail/"+elem.sseq} onClick={()=>{setMypagePopup(false)}}>{(elem.spaceimage.length>0)&&(<img src={`https://final-kimminju.s3.ap-northeast-2.amazonaws.com/space_images/${elem.spaceimage[0].realName}`} alt='placeimg'/>)}<p>{elem.title}</p></Link></SwiperSlide>
            )))}
         
        </Swiper>
      </div>
      )}
    </div>
  )
}

export default MyInfo
