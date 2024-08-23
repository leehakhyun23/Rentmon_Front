import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import jaxios from '../../util/jwtUtil';
import MypagePaging from './Component/MypagePaging';
import QnaComponent from './Component/QnaComponent';
import QnaModal from './Component/QnaModal';

function Qna() {
    const user = useSelector(state=>state.user);
    const [isopen, setIsOpen] = useState(false);
    const [popup , setPopup] = useState({});
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
            if(result.data.list[0])setPopup(result.data.list[0]);
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
                            <QnaComponent num={begin-key} elem={elem} setIsOpen={setIsOpen} setPopup={setPopup}  />
                        </div>
                    ))
                ):""}
            </div>

            <div className='paganation'>
                <MypagePaging page={page} url={"/mypage/qna/"}/>
            </div>
           <QnaModal isopen={isopen} setIsOpen={setIsOpen} popup={popup} />
        </div>
    )
}

export default Qna
