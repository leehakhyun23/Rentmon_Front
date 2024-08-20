import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

function MainSlide() {
  return (
    <Swiper  autoplay={{delay: 3000,disableOnInteraction: false,}}
      loop={true} navigation={true} modules={[Navigation]} className="mainSlide">
        <SwiperSlide><img src="/img/banner1.png" alt='banner'/></SwiperSlide>
        <SwiperSlide><img src="/img/banner2.png" alt='banner'/></SwiperSlide>
    </Swiper>
  )
}

export default MainSlide
