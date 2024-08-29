import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dayFormat } from '../../../util/formatDate';
import jaxios from '../../../util/jwtUtil';
import { RiDeleteBack2Line } from "react-icons/ri";
import ReactStars from 'react-rating-stars-component';

import SapcePaging from './SapcePaging';
import ReviewModal from './ReviewModal';



function ReviewList({ sseq, reviewopen, setReviewopen }) {
    let user = useSelector(state => state.user);
    const [list, setList] = useState([]);
    const [page, setPage] = useState({});
    const [begin, setBegin] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getList();
    }, [currentPage])

    let getList = async () => {
        try {
            let result = await jaxios.get(`/api/review/GetReviewList/${sseq}`, { params: { page: currentPage } })
            console.log(result.data);
            setList(result.data.list);
            setPage(result.data.paging);
            setBegin(result.data.paging.recordAllcount - (result.data.paging.recordrow * (result.data.paging.currentPage - 1)));
        } catch (err) { console.error(err); }
    }

    let deleteReview = async (rseq) => { }

    return (
        <div className='inquiryList'>
            <div className='title'>
                <h2>Review {page.recordAllcount}개</h2>
            </div>
            <div className='qnaList'>
                {(list) ? (
                    list.map((elem, key) => (
                        <div className='row' key={key}>
                            <div className='userWrap'>
                                <div className='userinfo'>
                                    <div className='userimg'><img src={`${(elem.user.profileimg) ? "http://localhost:8070/profile_images/" + elem.user.profileimg : "/img/no_profileimg.png"}`} /></div>
                                </div>
                                <div className='right'>
                                    <div className='username'>{elem.user.userid}</div>

                                    <div className='usercontent'>
                                        <ReactStars
                                            count={5}
                                            size={18}
                                            value={elem.rate}
                                            edit={false}
                                            activeColor="#0090DF"
                                        />
                                        <br/>
                                        <div className='content'>    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{elem.content}</pre>
                                        </div>
                                        {elem.images && (
                                            elem.images.map((img, idx) => (
                                                <div key={idx}>
                                                    <img
                                                        src={`http://localhost:8070/review_images/${img.realname}`}
                                                        alt={`리뷰 이미지 ${idx}`}
                                                        style={{ width: '300px', height: '300px', objectFit: 'cover', marginRight: '10px', float: 'left' }}
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className='inquiryDate'>
                                        {dayFormat(elem.created_at)}
                                    </div>


                                    {(elem.user.userid === user.userid) && (<div className='delet' onClick={() => { deleteReview(elem.rseq) }}>삭제<RiDeleteBack2Line /></div>)}
                                </div>
                            </div>
                            {(elem.reply) && (
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
                ) : ""}
            </div>

            <div className='paganation'>
                <SapcePaging page={page} SapcePaging={SapcePaging} />
            </div>

            <ReviewModal reviewopen={reviewopen} setReviewopen={setReviewopen} getList={getList} />
        </div>

    )
}

export default ReviewList
