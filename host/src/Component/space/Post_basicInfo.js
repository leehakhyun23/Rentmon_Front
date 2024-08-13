import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setSpace } from '../../store/spaceSlice'; // Redux slice import
import axios from 'axios';
import '../css/header.css';
import '../css/basicinfo.css';

function Post_basicInfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize useDispatch
    const currentSpace = useSelector((state) => state.space); // Get current space from Redux store

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [caution, setCaution] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [province, setProvince] = useState(''); 
    const [town, setTown] = useState('');
    const [village, setVillage] = useState('');
    const [address_detail, setAddress_detail] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({ display: 'none' });
    const [price, setPrice]= useState('');
    const [personnal, setPersonnal] = useState('');
    const [maxpersonnal, setMaxpersonnal] = useState('');
    const postcodeRef = useRef(null);
    const detailAddressRef = useRef(null);
    const extraAddressRef = useRef(null);

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

    const openPostcode = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    let addr = '';
                    let extraAddr = '';
                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else {
                        addr = data.jibunAddress;
                    }
                    if (postcodeRef.current) {
                        postcodeRef.current.value = data.zonecode;
                        setZipcode(data.zonecode);
                        setProvince(data.sido);
                        setTown(data.sigungu);
                        setVillage(data.roadname);
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
        // Dispatch the setSpace action with current state
        dispatch(setSpace({
            cnum: currentSpace.cnum || '', // Use existing cnum or empty string if not available
            title,
            subtitle,
            price,
            personnal,
            maxpersonnal,
            content,
            caution,
            zipcode,
            province,
            town,
            village,
            address_detail,
            imgSrc,
        }));

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
                <textarea rows="2" className='binput' value={subtitle} onChange={(e) => setSubtitle(e.currentTarget.value)} placeholder='한줄 공간 설명'></textarea>
            </div>
            <div className='field2'>
                <input className='binput' type="text" value={price} onChange={(e) => setPrice(e.currentTarget.value)} placeholder='가격 원/시간'/>
            </div>
            <div className='field2'>
                <input className='binput' type="text" value={personnal} onChange={(e) => setPersonnal(e.currentTarget.value)} placeholder='기본 인원'/>
            </div>
            <div className='field2'>
                <input className='binput' type="text" value={maxpersonnal} onChange={(e) => setMaxpersonnal(e.currentTarget.value)} placeholder='최대인원'/>
            </div>
            <div className='field1'>
                <textarea className='binput' rows="7" value={content} onChange={(e) => setContent(e.currentTarget.value)} placeholder='공간 소개'></textarea >
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
                />
            </div>
            <div className='field1'>
                <input
                    className='binput'
                    type="text"
                    value={town}
                    readOnly
                    placeholder='구/군'
                />
            </div>
            <div className='field1'>
                <input
                    className='binput'
                    type="text"
                    value={village}
                    readOnly
                    placeholder='동'
                />
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
