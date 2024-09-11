import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/header.css';
import '../css/colbasicinfo.css';
import jaxios from '../../util/jwtUtil';
import Header from '../HeaderFooter/Header'
import Submenu from '../member/Submenu';

function Col_basicInfo() {
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [caution, setCaution] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [province, setProvince] = useState('');
    const [town, setTown] = useState('');
    const [village, setVillage] = useState('');
    const [addressdetail, setAddressdetail] = useState('');
    const [price, setPrice] = useState('');
    const [maxpersonnal, setMaxpersonnal] = useState('');

    const postcodeRef = useRef(null);
    const detailAddressRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const extraAddressRef = useRef(null);
    const queryParams = new URLSearchParams(location.search);
    const sseq = queryParams.get('sseq'); // Get sseq from query parameters

    useEffect(() => {
        if (sseq) {
            // Fetch existing space data
            axios.get(`/api/space/colspace?sseq=${sseq}`)
                .then(response => {
                    const space = response.data;
                    setTitle(space.title);
                    setSubtitle(space.subtitle);
                    setPrice(space.price);
                    setMaxpersonnal(space.maxpersonnal);
                    setContent(space.content);
                    setCaution(space.caution);
                    setZipcode(space.zipcode);
                    setProvince(space.province);
                    setTown(space.town);
                    setVillage(space.village);
                    setAddress(space.address);
                    setAddressdetail(space.addressdetail);
                    console.log("Fetched address_detail:", space.addressdetail); 
                })
                .catch(error => {
                    console.error('Error fetching space data:', error);
                });
        }
    }, [sseq]);

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
        axios.put(`/api/space/collectspace/${sseq}`, {
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
            addressdetail,
            address
        })
        .then(() => {
            navigate('/SpaceManage'); // Navigate to the next page or provide feedback
        })
        .catch(error => {
            console.error('Error updating space data:', error);
        });
    };

    return (
        <div className='container'>
                <div className='rheader'>
                <div className='logo3'>기본 정보 수정</div>
                {/* <div className='left'><Submenu /></div> */}
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
                    value={addressdetail}
                    onChange={(e) => setAddressdetail(e.currentTarget.value)}
                />
            </div>

            <div className='but2'>
                <button className="but" onClick={() => navigate('/SpaceManage')}>이전</button>
                <button className="but" onClick={onSubmit}>저장</button>
            </div>
        </div>
    );
}

export default Col_basicInfo;
