import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

import { FaRegStar, FaStar } from 'react-icons/fa';
import { PiMapPinLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { BsChatRightDots } from "react-icons/bs";
import "../css/spacebox.css"




function SpaceBoxComponent({record}) {
    const [rating , setRating]  =useState([]);
    useEffect(()=>{
        setRating([]);
        let rating=(record.rating);
        for(let i =0; i < 5; i++){
            if(rating>0) setRating(prev=>[...prev, true]);
            else setRating(prev=>[...prev, false]);
            rating--;
        }
    },[record]);
  return (
    <div className='spaceCompoent'>
            <div className='imageWrap'>
                <Swiper  navigation={true} modules={[Navigation]} className="spaceImgSwiper">
                    {(record.space.spaceimage.length > 0)&&(record.space.spaceimage.map((elem, key)=>(
                        <SwiperSlide key={key}><img src={`http://localhost:8070/space_images/${elem.realName}`} alt='banner'/></SwiperSlide>
                    )))}
                </Swiper>
            </div>
            <div className='content'>
                <Link to={`/spaceDetail/${record.space.sseq}`}>
                    <div className='title'>
                        <span>{record.space.title}</span> 
                        <span>
                            {rating.map((elem,key)=>{
                                    if(elem ==true) return <FaStar key={key} className='fullstart'/>
                                    else return <FaRegStar key={key}/>   
                            })}
                        </span>
                    </div>
                    <div className='station'>
                        <span>
                        <PiMapPinLight />
                        {record.space.town}
                        </span>
                        <span className='tags'>
                            {(record.hashtag)&&(record.hashtag.map((elem, idx)=>(
                                <small key={idx}>#{elem.word} </small>
                            )))}
                        </span>
                    </div>
                    <div className='priceAndinfo'>
                        <div className='price'>
                            {new Intl.NumberFormat("Ko-kr").format(record.space.price)} <small>원/시간</small>
                        </div>
                        <div className='info'>
                            <span><GoPerson /> 최대 {record.space.maxpersonnal}</span>
                            <span><CiHeart /> {record.zzimCount}</span>
                            <span><BsChatRightDots /> {record.reviewCount}</span>
                        </div>
                    </div>
                </Link>
            </div>


    </div>
  )
}

export default SpaceBoxComponent
