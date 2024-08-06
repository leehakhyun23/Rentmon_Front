import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Post_basicInfo() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [caution, setCaution] = useState('');
    const [zipcode, setZipcode] = useState(''); // 우편번호
    const [province, setProvince] = useState(''); // 시도
    const [town, setTown] = useState('');         // 구군
    const [village, setVillage] = useState('');   // 동
    const [address_detail, setAddress_detail] = useState(''); // 상세주소

    return (
        <div>
            <div>기본 정보</div>
            
            <div className='field'>
                <label>공간명</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </div>
            <div className='field'>
                <label>한줄 공간 설명</label>
                <textarea rows="2" value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <label>공간 소개</label>
                <textarea rows="7" value={content} onChange={(e) => setContent(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <label>주의 사항</label>
                <textarea rows="7" value={caution} onChange={(e) => setCaution(e.currentTarget.value)}></textarea>
            </div>
            
            <div className='field'>
                <label>우편번호</label>
                <input type="text" value={zipcode} onChange={(e) => setZipcode(e.currentTarget.value)} />
            </div>
            <div className='field'>
                <label>시도</label>
                <input type="text" value={province} onChange={(e) => setProvince(e.currentTarget.value)} />
            </div>
            <div className='field'>
                <label>구군</label>
                <input type="text" value={town} onChange={(e) => setTown(e.currentTarget.value)} />
            </div>
            <div className='field'>
                <label>동</label>
                <input type="text" value={village} onChange={(e) => setVillage(e.currentTarget.value)} />
            </div>
            <div className='field'>
                <label>상세주소</label>
                <input type="text" value={address_detail} onChange={(e) => setAddress_detail(e.currentTarget.value)} />
            </div>

            <div>
                <button onClick={() => navigate('/Post_cate')}>이전</button>
                
                <button>다음</button>
            </div>
        </div>
    );
}

export default Post_basicInfo;
