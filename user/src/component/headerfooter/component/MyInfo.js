import React from 'react'
import MypageIconButton from './MypageIconButton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

function MyInfo() {
  
  return (
    <div className='myInfo'>
      <h3>내 정보</h3>
      <div className='myGrade'>
        <img src='/img/bronze.png' alt='bronze.png'/>
        <div>
            <span>브론즈</span>
            <p>실버까지 대여 1회 남았습니다.</p>
        </div>
      </div>
      <div className='mypagemenu'>
        <MypageIconButton imglink = {"couponicon.svg"}  text = {"쿠폰(1)"} goLink={"/mypage/coupon"}/>
        <MypageIconButton imglink = {"calendaricon.svg"}  text = {"예약(2)"} goLink={"/mypage/reservation"}/>
        <MypageIconButton imglink = {"boxicon.svg"}  text = {`이용한 공간(9)`}  goLink={"/mypage/usesapce"}/>
        <MypageIconButton imglink = {"hearticon.svg"}  text = {"찜(1)"}  goLink={"/mypage/zzim"}/>
        <MypageIconButton imglink = {"chaticon.svg"}  text = {"문의(1)"}  goLink={"/mypage/qna"}/>
      </div>
      <div className='recentViewSpace'>
      <h3>최근 본 공간(5)</h3>
          <Swiper
            slidesPerView={2.5}
            spaceBetween={12}
            freeMode={true}
            
            modules={[FreeMode, Pagination]}
            className="mySwiper"
        >
          <SwiperSlide><Link to={"/"}><img src='/img/placeimg.png' alt='placeimg'/><p>A스튜디오</p></Link></SwiperSlide>
          <SwiperSlide><Link to={"/"}><img src='/img/placeimg.png' alt='placeimg'/><p>A스튜디오</p></Link></SwiperSlide>
          <SwiperSlide><Link to={"/"}><img src='/img/placeimg.png' alt='placeimg'/><p>A스튜디오</p></Link></SwiperSlide>
          <SwiperSlide><Link to={"/"}><img src='/img/placeimg.png' alt='placeimg'/><p>A스튜디오</p></Link></SwiperSlide>
          <SwiperSlide><Link to={"/"}><img src='/img/placeimg.png' alt='placeimg'/><p>A스튜디오</p></Link></SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default MyInfo
