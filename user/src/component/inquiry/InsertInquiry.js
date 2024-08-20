import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function InsertInquiry(){
  let {scseq}=useParams();
  let user = useSelector(state=>state.user);
  let [data , setData] = useState({
    scseq,
    title:"",
    content:"",
    userid : user.userid
  });
  useEffect(()=>{
    console.log(scseq);
  },[]);
  return (
    <div className='innerContainer'>
      <div className='insertInquiry'>
        <h2>문의/신고하기</h2>
      </div>
      <div>
          <div className='row'>
            
          </div>
      </div>
    </div>
  )
}

export default InsertInquiry
