import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import jaxios from '../../util/jwtUtil';
import MypagePaging from './Component/MypagePaging';
import QnaComponent from './Component/QnaComponent';

function Qna() {
    const user = useSelector(state=>state.user);
    const [list, setList]=useState([]);
    const [page, setPage] = useState({});
    const [begin,setBegin] =useState(0);
    let {currentPage}=useParams();

    useEffect(()=>{
        getList();
    },[currentPage]);

    let getList=async()=>{
        try{
            let result = await jaxios.get("/api/inquery/getInqueryList/"+user.userid,{params:{page:currentPage}});
            console.log(result.data);
            setList(result.data.list);
            setPage(result.data.paging);
            setBegin(result.data.paging.recordAllcount - (result.data.paging.recordrow*(result.data.paging.currentPage-1)));
        }catch(err){console.error(err);}
    }
    return (
        <div className='mypagecommon qna'>
            <div className='title'>
                <h2>문의 ({page.recordAllcount})</h2>
            </div>
            <div className='qnaList'>
                <div className='row title'>
                    <div>
                    <div className='num'>no.</div>
                    <div className='title'>제목</div>
                    <div className='lastDate'>질문 날짜</div>
                    <div className='reply'>답변유무</div>
                    </div>
                </div>
                {(list) ?(
                    list.map((elem, key)=>(
                        <div className='row' key={key}>
                            <QnaComponent num={begin-key} title={elem.title} lastDate={elem.created_at} reply={elem.reply}  />
                        </div>
                    ))
                ):""}
            </div>

            <div className='paganation'>
                <MypagePaging page={page} url={"/mypage/qna/"}/>
            </div>
        </div>
    )
}

export default Qna
