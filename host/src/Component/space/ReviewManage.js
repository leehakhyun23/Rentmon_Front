import React, { useEffect, useState } from 'react';
import Header from '../HeaderFooter/Header';
import Submenu from '../member/Submenu';
import '../css/reviewManage.css';
import '../css/header.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jaxios from '../../util/jwtUtil';

function ReviewManage() {
  const host = useSelector(state => state.host);
  const [activeTab, setActiveTab] = useState('review');
  const [reviews, setReviews] = useState([]);
  const [inquirys, setInquirys] = useState([]);
  const [filteredInquirys, setFilteredInquirys] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]); // 상태 변수 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inqueryData, setInqueryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('option1');
  const [replyInput, setReplyInput] = useState({});
  const [replyiInput, setReplyiInput] = useState({});
  const [spaceTitles, setSpaceTitles] = useState({});
  const navigate = useNavigate();
  const hostid = useSelector(state => state.host.hostid);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownChange = (event) => {
    const newValue = event.target.value;
    setDropdownValue(newValue);
    const sortedReviews = sortReviews(filteredReviews, newValue); // 필터링된 리뷰를 사용
    setFilteredReviews(sortedReviews);
  };

  const fetchSpaceTitle = async (sseq) => {
    try {
      const token = localStorage.getItem('token');
      const response = await jaxios.get(`/api/space/getSpaceTitle`, {
        params: { sseq },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(`Fetched space title for sseq ${sseq}: ${response.data}`); // 응답 데이터 확인
      setSpaceTitles(prevTitles => ({
        ...prevTitles,
        [sseq]: response.data // 상태 업데이트
      }));
    } catch (err) {
      console.error("공간명을 가져오는 데 문제가 발생했습니다.", err);
    }
  };
  
  

  const fetchInqueryData = async (hostid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await jaxios.get(`/api/inquery/igetsseq?hostid=${hostid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setInqueryData(response.data);
  
      // 인쿼리의 공간명 가져오기
      response.data.forEach(inquiry => {
        if (inquiry.space && inquiry.space.sseq) {
          fetchSpaceTitle(inquiry.space.sseq);
        }
      });
    } catch (err) {
      console.error("인쿼리 데이터를 가져오는 데 문제가 발생했습니다.", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await jaxios.get(`/api/review/getsseq?hostid=${hostid}`);
      const sortedReviews = sortReviews(response.data, dropdownValue);
      setReviews(sortedReviews);
      setFilteredReviews(sortedReviews);
  
      // 리뷰의 공간명 가져오기
      sortedReviews.forEach(review => {
        if (review.space && review.space.sseq) {
          fetchSpaceTitle(review.space.sseq);
        }
      });
  
      fetchInqueryData(hostid);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // 정보를 수정할 때만 경고를 띄우도록 수정
    if (host.hostid || host.provider !== 'kakao') {
        if (!host.hostid) {
            alert('로그인이 필요한 서비스입니다');
            navigate('/main');
        }
    }
}, [host, navigate]);

useEffect(() => {
  fetchReviews();
}, [hostid, dropdownValue]);


  const handleSearch = () => {
    try {
      const filtered = reviews.filter(review =>
        review.rseq.toString().includes(searchTerm)
      );
      setFilteredReviews(filtered);
    } catch (error) {
      console.error("데이터를 필터링하는 데 문제가 발생했습니다.", error);
    }
  };

  const handleReplyChange = (id, event) => {
    setReplyInput(prev => ({
      ...prev,
      [id]: event.target.value
    }));
  };

  const handleReplySubmit = async (rseq) => {
    try {
      await jaxios.post(`/api/review/insertreply`, { rseq, reply: replyInput[rseq] });
      const updatedReviews = reviews.map(review =>
        review.rseq === rseq ? { ...review, reply: replyInput[rseq] } : review
      );
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews);
      setReplyInput(prev => ({ ...prev, [rseq]: '' }));
    } catch (error) {
      console.error("답글을 저장하는 데 문제가 발생했습니다.", error);
    }
  };

  const handleReply = async (iseq) => {
    try {
      await jaxios.post(`/api/inquery/insertreply`, { iseq, reply: replyInput[iseq] });
      const updatedInquirys = inquirys.map(inquiry =>
        inquiry.iseq === iseq ? { ...inquiry, reply: replyInput[iseq] } : inquiry
      );
      setInquirys(updatedInquirys);
      setFilteredInquirys(updatedInquirys);
      setReplyiInput(prev => ({ ...prev, [iseq]: '' }));
    } catch (error) {
      console.error("답글을 저장하는 데 문제가 발생했습니다.", error);
    }
  };

  const sortReviews = (reviews, sortOrder) => {
    return reviews.slice().sort((a, b) => {
      if (sortOrder === 'option1') { // 별점 높은 순
        return b.rate - a.rate;
      } else if (sortOrder === 'option2') { // 별점 낮은 순
        return a.rate - b.rate;
      }
      return 0; // 기본값
    });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 가져오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <article>
      <div className='rheader'>
        <div className='logo3'>이용 후기 관리</div>
        <div className='left'><Submenu /></div>
      </div>
      <div className='rq'>
        <button
          className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => handleTabClick('review')}
        >
          이용 후기
        </button>
        <button
          className={`tab-button ${activeTab === 'qna' ? 'active' : ''}`}
          onClick={() => handleTabClick('qna')}
        >
          Q&A
        </button>
      </div>
      <div>
        {activeTab === 'review' && (
          <div>
            <div className='search'>
              <div>리뷰 정보 검색</div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: '80%' }}
                placeholder='예약번호로 검색'
              />
              <button onClick={handleSearch}>검색</button>
            </div>
            <div className="container1">
              <div className="select-container">
                <select id="myDropdown" value={dropdownValue} onChange={handleDropdownChange}>
                  <option value="option1">별점 높은 순</option>
                  <option value="option2">별점 낮은 순</option>
                </select>
              </div>
            </div>
            <div>
              <table className='reviewtable'>
                <thead>
                  <tr>
                    <th>예약 번호</th>
                    <th>내용</th>
                    <th>평점</th>
                    <th>예약자명</th>
                    <th>공간명</th>
                    <th>답글</th>
                    <th>답글 작성</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.rseq}>
                      <td>{review.rseq}</td>
                      <td>{review.content}</td>
                      <td>{review.rate}</td>
                      <td>{review.user ? review.user.userid : '알 수 없음'}</td>
                      <td>{spaceTitles[review.space ? review.space.sseq : ''] || '알 수 없음'}</td>
                      <td>{review.reply ? review.reply : '없음'}</td>
                      <td>
                        {review.reply ? (
                          <span></span>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={replyInput[review.rseq] || ''}
                              onChange={(e) => handleReplyChange(review.rseq, e)}
                              placeholder="답글 작성..."
                            />
                            <button onClick={() => handleReplySubmit(review.rseq)}>답글 추가</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'qna' && (
          <div className='qnaa'>
            <div className='qnatext'>Q&A 내용</div>
            <table className='qnatable'>
              <thead>
                <tr>
                  <th>문의번호</th>
                  <th>내용</th>
                  <th>제목</th>
                  <th>문의시간</th>
                  <th>공간명</th>
                  <th>문의자명</th>
                  <th>답글</th>
                  <th>답글작성</th>
                </tr>
              </thead>
              <tbody>
                {inqueryData.map((inquiry) => (
                  <tr key={inquiry.iseq}>
                    <td>{inquiry.iseq}</td>
                    <td>{inquiry.content}</td>
                    <td>{inquiry.title}</td>
                    <td>{new Date(inquiry.created_at).toLocaleString()}</td>
                    <td>{spaceTitles[inquiry.space ? inquiry.space.sseq : ''] || '알 수 없음'}</td>
                    <td>{inquiry.user.userid}</td>
                    <td>{inquiry.reply ? inquiry.reply : '없음'}</td>
                    <td>
                      {inquiry.reply ? (
                        <span></span>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={replyInput[inquiry.iseq] || ''}
                            onChange={(e) => handleReplyChange(inquiry.iseq, e)}
                            placeholder="답글 작성..."
                          />
                          <button onClick={() => handleReply(inquiry.iseq)}>답글 추가</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </article>
  );
}

export default ReviewManage;
