import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import jaxios from '../../../util/jwtUtil';
import 'swiper/css/scrollbar';

import axios from 'axios';
import SpaceBoxComponent from './SpaceBoxComponent';


function RecommandSpace({user}) {
    const [rcList , setRcList] = useState([]);

    useEffect(()=>{
        getRecommandSpace();
    },[user]);
    
    let getRecommandSpace=async()=>{
        try{
            
            let result
            if(user.name){ result = await axios.post("/api/main/getRecommandSpace",user)}
            else { result = await axios.post("/api/main/getRecommandSpace")}
            setRcList(result.data);
        }catch(err){console.error(err);}
    }

  return (
    <div className='recommandSection'>
      <div className='recommna'>
        <h2>추천 공간</h2>
        <p>이런 공간은 어떠세요?</p>
      </div>
      <Swiper slidesPerView={1.2} spaceBetween={10} grabCursor={true} 
            scrollbar={{ hide: false }}
            modules={[Scrollbar]}
            breakpoints={{
              769: {
                spaceBetween: 30,
                slidesPerView: 3,
                slidesPerGroup: 1,
              },}}
            className="rcommandSlide" >
        {(rcList)&&(rcList.map((elem, idx)=>(
          <SwiperSlide key ={idx}>
            <SpaceBoxComponent record={elem} />
          </SwiperSlide>
        )))}
      </Swiper>
    </div>
  )
}

export default RecommandSpace
