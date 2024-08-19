import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import jaxios from '../../../util/jwtUtil';
import axios from 'axios';


function RecommandSpace({user}) {
    const [rcList , setRcList] = useState([]);

    useEffect(()=>{
        getRecommandSpace();
    },[user]);
    

    let getRecommandSpace=async()=>{
        try{
            
            let result
            if(user.email){ result = await axios.post("/api/main/getRecommandSpace",user)}
            else { result = await axios.post("/api/main/getRecommandSpace")}
            console.log(result.data);
        }catch(err){console.error(err);}
    }

  return (
    <div className='recommandSection'>
      <div className='recommna'>
        <h2>추천 공간</h2>
        <p>이런 공간은 어떠세요?!</p>
      </div>
      <Swiper slidesPerView={3} spaceBetween={30} grabCursor={true} breakpoints={{
            769: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },}}
        scrollbar={true} modules={[Scrollbar]} className="rcommandSlide" >
        <SwiperSlide>
            
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default RecommandSpace
