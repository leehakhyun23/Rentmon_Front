import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { setSpace } from '../../store/spaceSlice'; 
import axios from 'axios';
import '../css/basicinfo.css';
import '../css/header.css';
import '../css/reviewManage.css'
import Header from '../HeaderFooter/Header'
import jaxios from '../../util/jwtUtil';
import Submenu from '../member/Submenu';
function Post_basicInfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentSpace = useSelector((state) => state.space);
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [caution, setCaution] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [province, setProvince] = useState(''); 
    const [town, setTown] = useState('');
    const [village, setVillage] = useState('');
    const [address_detail, setAddress_detail] = useState('');
    const [price, setPrice]= useState('');
    const [maxpersonnal, setMaxpersonnal] = useState('');
    const [imgsrc, setImgsrc] = useState([]);
    const [divStyle, setDivStyle] = useState(Array(10).fill({display:'none'}));
    const [rList, setRList] = useState([]);
    const [oList, setOList] = useState([]);
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

    const fieldStyle = {
        width:"100%", 
        display: "flex",
        flexDirection:"row",
        margin:"5px 0",
        justifyContent: "space-between",
    };

    async function imgUpload(e, index) {
        let formData = new FormData();
        formData.append('image', e.target.files[0]);

        const result = await jaxios.post('/api/space/imgup', formData);
        let realname = result.data.realname;
        let originalname = result.data.originalname;

        setDivStyle(prevStyles => {
            const newStyles = [...prevStyles];
            newStyles[index] = fieldStyle;
            return newStyles;
        });

        setImgsrc(prevImgsrc => {
            const newImgsrc = [...prevImgsrc];
            newImgsrc[index] = `http://localhost:8070/space_images/${realname}`;
            return newImgsrc;
        });

        setRList(prevList => [...prevList, realname]);
        setOList(prevList => [...prevList, originalname]);

        console.log('rList:', rList);
        console.log('oList:', oList);
    }

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
                        setAddress(data.address);
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
        dispatch(setSpace({
            cnum: currentSpace.cnum || '',
            title,
            subtitle,
            price,
            maxpersonnal,
            content,
            caution,
            zipcode,
            province,
            town,
            village,
            address_detail,
            rList,
            oList,
            address,
        }));
        console.log("rList:", rList);
        console.log("oList:", oList);
        navigate('/Post_useInfo');
    };

    return (
        <div className='container'>
               <div className='rheader'>
                <div className='logo3'>기본 정보</div>
                <div className='left'><Submenu /></div>
            </div>
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
                <input className='binput' type="text" value={maxpersonnal} onChange={(e) => setMaxpersonnal(e.currentTarget.value)} placeholder='최대인원'/>
            </div>
            <div className='field1'>
                <textarea className='binput' rows="7" value={content} onChange={(e) => setContent(e.currentTarget.value)} placeholder='공간 소개'></textarea>
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
            {[1,2,3,4,5,6,7,8,9,10].map((num, index) => (
                <div className='field1' key={num} style={divStyle[index]}>
                    <input type="file" onChange={(e) => imgUpload(e, index)} />
                    {imgsrc[index] && <img src={imgsrc[index]} alt={`img${num}`} height="50" />}
                </div>
            ))}
            <div className='but2'>
                <button className="but" onClick={() => navigate('/Post_cate')}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_basicInfo;
