import { async } from 'q';
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import jaxios from '../../../util/jwtUtil';

function InqueryModal({inquiryopen , setInquiryopen , getList}) {
    let user = useSelector(state=>state.user);
    let {sseq}=useParams();
    let [issubmit, setisSubmit] = useState(false); 
    let [data , setData] = useState({});
      useEffect(()=>{
        setData({
            sseq,
            title:"",
            content:"",
            userid : user.userid
        });
      },[inquiryopen]);

      useEffect(()=>{
        setisSubmit(false);
        if(data.title && data.content) setisSubmit(true);
      },[data])

      let onsubmit=async()=>{
        try{
            let result = await jaxios.post("/api/inquery/insertInquiry",data);
            setInquiryopen();
            //새로 불러올 인쿼리
            getList();
        }catch(err){console.log(err);}
      }
  return (
    <ReactModal
        isOpen={inquiryopen} 
        onRequestClose={()=>{setInquiryopen(false)}}>
      <div className='inquirypopup'>
        <h2>문의/신고하기</h2>
        <div>
            <div className='row writer'>
                <span>작성자 : </span>
                <p className='useridName'>{user.userid}</p>
            </div>
            <div className='row'>
                <span>제목 : </span>
                <input type="text" name="title" value={data.title} onChange={(e)=>{
              setData(prev=>{return {...prev, title: e.target.value}});
            }} />
            </div>
            <div className='row'>
                <span>내용 : </span>
                <textarea name="title" value={data.content} onChange={(e)=>{
              setData(prev=>{return {...prev, content: e.target.value}});
            }} > </textarea>
            </div>
            <div className='row btnwrap'>
                <button className={(issubmit)?("active"):("")} onClick={()=>{onsubmit()}}>전송</button>
                <button onClick={()=>{setInquiryopen(false)}}>취소</button>
            </div>
            
        </div>
      </div>
    </ReactModal>
  )
}

export default InqueryModal
