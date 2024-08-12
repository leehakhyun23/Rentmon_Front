import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/header.css';
import '../css/basicinfo.css';

function Post_basicInfo() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [caution, setCaution] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [province, setProvince] = useState(''); // 시도
    const [town, setTown] = useState('');         // 구군
    const [village, setVillage] = useState('');   // 동
    const [address_detail, setAddress_detail] = useState(''); // 상세주소
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({ display: 'none' });
    
    // DOM 요소 참조
    const postcodeRef = useRef(null);
    const addressRef = useRef(null);
    const detailAddressRef = useRef(null);
    const extraAddressRef = useRef(null);

    // 카카오 주소 API 스크립트 로딩
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        script.onload = () => {
            window.daum = window.daum || {};
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 주소 검색 열기
    const openPostcode = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    let addr = '';
                    let extraAddr = '';
    
                    // 선택된 주소 타입에 따라 주소를 설정
                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else {
                        addr = data.jibunAddress;
                    }
    
                    // 우편번호 설정
                    if (postcodeRef.current) {
                        postcodeRef.current.value = data.zonecode;
                        setZipcode(data.zonecode); // 상태 업데이트
                        console.log(data.sido);
                        console.log(data.sigungu);
                        console.log(data.roadname);
                        setProvince(data.sido); // 시도 상태 업데이트
                        setTown(data.sigungu);  // 구군 상태 업데이트
                        setVillage(data.roadname); // 동 상태 업데이트
                    }
    
                
    
                    if (extraAddressRef.current) {
                        extraAddressRef.current.value = extraAddr;
                    }
    
                    if (detailAddressRef.current) {
                        detailAddressRef.current.focus();
                    }
                }
            }).open();
        } else {
            console.error("daum.Postcode is not loaded.");
        }
    };

    const onSubmit = () => {
        navigate('/Post_useInfo');
    };

    async function fileupload(e) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const result = await axios.post('/api/member/fileupload', formData);
        setImgSrc(`http://localhost:8070/uploads/${result.data.filename}`);
        setImgStyle({ display: 'block', width: '200px' });
    }

    return (
        <div className='container'>
            <div className='header2'>기본 정보</div>
            
            <div className='field2'>
                
                <input className='binput' type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder='공간명'/>
            </div>
            <div className='field1'>
                <textarea rows="2" className='binput' value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} placeholder='한줄 공간 설명' ></textarea>
            </div>
            <div className='field1'>
                <textarea className='binput' rows="7" value={content} onChange={(e) => setContent(e.currentTarget.value)} placeholder='공간 소개' ></textarea >
            </div>
            <div className='field1'>
                <textarea className='binput' rows="7" value={caution} onChange={(e) => setCaution(e.currentTarget.value)} placeholder='주의 사항'></textarea>
            </div>
            <div className='field1'>
                <input
                    className='binput'
                    id="sample6_postcode"
                    type="text"
                    ref={postcodeRef}
                    value={zipcode}
                    readOnly
                    onClick={openPostcode}
                    placeholder='우편번호'
                />
            </div>
            
            <div className='field1'>
                <input
                    className='binput'
                    type="text"
                    value={province}
                    readOnly
                    placeholder='시/도'
                    onChange={(e) => setProvince(e.currentTarget.value)}/>
            </div>
            <div className='field1'>
                <input
                    className='binput'
                    type="text"
                    value={town}
                    readOnly
                    placeholder='구/군'
                    onChange={(e) => setTown(e.currentTarget.value)}/>
            </div>
            <div className='field1'>
                <input
                    className='binput'
                    type="text"
                    value={village}
                    readOnly
                    placeholder='동'
                    onChange={(e) => setVillage(e.currentTarget.value)}/>
            </div>
            <div className='field1'>
                <input
                    placeholder='상세 주소'
                    className='binput'
                    type="text"
                    ref={detailAddressRef}
                    value={address_detail}
                    onChange={(e) => setAddress_detail(e.currentTarget.value)}
                />
            </div>
            <div className='field1'>
                <input
                    className='binput'
                    type="file"
                    onChange={(e) => fileupload(e)}
                    placeholder='공간 사진'
                />
            </div>
            <div className='field1'>
                <div>
                    <img src={imgSrc} style={imgStyle} alt="Uploaded" />
                </div>
            </div>

            <div className='but2'>
                <button className="but" onClick={() => navigate('/Post_cate')}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_basicInfo;
