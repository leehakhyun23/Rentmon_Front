import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dayFormat } from '../../../util/formatDate';
import jaxios from '../../../util/jwtUtil';
import { RiDeleteBack2Line } from "react-icons/ri";


import SapcePaging from './SapcePaging';
import InqueryModal from './InqueryModal';
import axios from 'axios';


function InquiryList({sseq , inquiryopen , setInquiryopen}) {
    let user = useSelector(state => state.user);
    const [list, setList]=useState([]);
    const [page, setPage] = useState({});
    const [begin,setBegin] =useState(0);
    const [currentPage , setCurrentPage] = useState(1);

    useEffect(()=>{
        getList();
    },[currentPage])

    let getList=async()=>{
        try{
            let result = await axios.get("/api/inquery/getInqueryListToHost/"+sseq,{params:{page:currentPage}});
            console.log(result.data);
            setList(result.data.list);
            setPage(result.data.paging);
            setBegin(result.data.paging.recordAllcount - (result.data.paging.recordrow*(result.data.paging.currentPage-1)));
        }catch(err){console.error(err);}
    }

    let deleteInquiry = async(iseq)=>{
        if(!window.confirm("정말 삭제하시겠습니까?")) return false;
        try{
            let result = await jaxios.get("/api/inquery/delete/"+iseq);
            getList();
        }catch(err){console.log(err)}
    }
    return (
        <div className='inquiryList'>
            <div className='title'>
                <h2>Q&A {page.recordAllcount}개</h2>
            </div>
            <div className='qnaList'>
                {(list) ?(
                    list.map((elem, key)=>(
                        <div className='row' key={key}>
                           <div className='userWrap'>
                                <div className='userinfo'>
                                    <div className='userimg'><img src={`${(elem.user.profileimg)?"https://final-kimminju.s3.ap-northeast-2.amazonaws.com/profile_images/"+elem.user.profileimg:"/img/no_profileimg.png"}`} /></div>
                                </div>
                                <div className='right'>
                                    <div className='username'>{elem.user.userid}</div>
                                    <div className='usercontent'>
                                        <div className='title'>{elem.title}</div>
                                        <div className='content'><pre>{elem.content}</pre></div>
                                    </div>
                                    <div className='inquiryDate'>
                                        {dayFormat(elem.created_at)}
                                    </div>
                                    {(elem.user.userid === user.userid)&&(<div className='delet' onClick={()=>{deleteInquiry(elem.iseq)}}>삭제<RiDeleteBack2Line /></div>)}
                                </div>
                           </div>
                           {(elem.reply)&&(
                            <div className='hostWrap'>
                                <div>
                                    <div className='hostid'>
                                        호스트의 답글
                                    </div>
                                    <div className='reply'>
                                        <pre>{elem.reply}</pre>
                                    </div>
                                    <div className='replydate'>
                                        {dayFormat(elem.replydate)}
                                    </div>
                                </div>
                            </div>
                           )}
                           
                        </div>
                    ))
                ):""}
            </div>

            <div className='paganation'>
                <SapcePaging  page={page} SapcePaging={setCurrentPage} />
            </div>

            <InqueryModal inquiryopen={inquiryopen} setInquiryopen= {setInquiryopen} getList={getList} />
        </div>
    )
}

export default InquiryList
