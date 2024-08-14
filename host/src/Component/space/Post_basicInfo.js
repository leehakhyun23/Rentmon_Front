import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setSpace } from '../../store/spaceSlice'; // Redux slice import
import axios from 'axios';
import '../css/header.css';
import '../css/basicinfo.css';
import jaxios from '../../util/jwtUtil';

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
    const [price, setPrice]= useState('');
    const [maxpersonnal, setMaxpersonnal] = useState('');
    const [ imgsrc1, setImgsrc1 ] = useState('');
    const [ imgsrc2, setImgsrc2 ] = useState('');
    const [ imgsrc3, setImgsrc3 ] = useState('');
    const [ imgsrc4, setImgsrc4 ] = useState('');
    const [ imgsrc5, setImgsrc5 ] = useState('');
    const [ imgsrc6, setImgsrc6 ] = useState('');
    const [ imgsrc7, setImgsrc7 ] = useState('');
    const [ imgsrc8, setImgsrc8 ] = useState('');
    const [ imgsrc9, setImgsrc9 ] = useState('');
    const [ imgsrc10, setImgsrc10 ] = useState('');

    const [ divStyle2, setDivStyle2 ] = useState({display:'none'});
    const [ divStyle3, setDivStyle3 ] = useState({display:'none'});
    const [ divStyle4, setDivStyle4 ] = useState({display:'none'});
    const [ divStyle5, setDivStyle5 ] = useState({display:'none'});
    const [ divStyle6, setDivStyle6 ] = useState({display:'none'});
    const [ divStyle7, setDivStyle7 ] = useState({display:'none'});
    const [ divStyle8, setDivStyle8 ] = useState({display:'none'});
    const [ divStyle9, setDivStyle9 ] = useState({display:'none'});
    const [ divStyle10, setDivStyle10 ] = useState({display:'none'});
    const [imgList, setIimgList] = useState([]);
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

    const fieldStyle={
        width:"100%", 
        display: "flex",
        flexDirection:"row",
        margin:"5px 0",
        justifyContent: "space-between",
        border:"1px solid black",
    }

    async function imgUpload(e, n){
        let formData = new FormData();
        formData.append('image', e.target.files[0] );

        const result = await jaxios.post('/api/space/imgup', formData );

        if( n == 1){
            setDivStyle2( fieldStyle );
            setImgsrc1( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 2){
            setDivStyle3( fieldStyle );
            setImgsrc2( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 3){
            setDivStyle4( fieldStyle );
            setImgsrc3( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 4){
            setDivStyle5( fieldStyle );
            setImgsrc4( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 5){
            setDivStyle6( fieldStyle );
            setImgsrc5( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 6){
            setDivStyle7( fieldStyle );
            setImgsrc6( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 7){
            setDivStyle8( fieldStyle );
            setImgsrc7( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 8){
            setDivStyle9( fieldStyle );
            setImgsrc8( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 9){
            setDivStyle10( fieldStyle );
            setImgsrc9( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }else if( n == 10){
            setImgsrc10( `http://localhost:8070/space_images/${result.data.savefilename}`);
        }

        let arr = [...imgList];
        arr.push(result.data.savefilename);
        setIimgList( [...arr] );
        console.log(imgList);

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
            maxpersonnal,
            content,
            caution,
            zipcode,
            province,
            town,
            village,
            address_detail,
            imgsrc1,
            imgsrc2,
            imgsrc3,
            imgsrc4,
            imgsrc5,
            imgsrc6,
            imgsrc7,
            imgsrc8,
            imgsrc9,
            imgsrc10,
        }));

        navigate('/Post_useInfo');
    };


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

            <div className='field1' id='img1'>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 1) }} />
                </div>
                <img src={imgsrc1} height="50"/>

                <div className='field1' id='img2' style={divStyle2}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 2) }} />
                </div>
                <img src={imgsrc2} height="50"/>

                <div className='field1' id='img3' style={divStyle3}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 3) }} />
                </div>
                <img src={imgsrc3} height="50"/>

                <div className='field1' id='img4' style={divStyle4}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 4) }} />
                </div>
                <img src={imgsrc4} height="50"/>

                <div className='field1' id='img5' style={divStyle5}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 5) }} />
                </div>
                <img src={imgsrc5} height="50"/>

                <div className='field1' id='img6' style={divStyle6}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 6) }} />
                </div>
                <img src={imgsrc6} height="50"/>

                <div className='field1' id='img7' style={divStyle7}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 7) }} />
                </div>
                <img src={imgsrc7} height="50"/>

                <div className='field1' id='img8' style={divStyle8}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 8) }} />
                </div>
                <img src={imgsrc8} height="50"/>

                <div className='field1' id='img9' style={divStyle9}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 9) }} />
                </div>
                <img src={imgsrc9} height="50"/>

                <div className='field1' id='img10' style={divStyle10}>
                    <input type="file" onChange={(e)=>{ imgUpload(e, 10) }} />
                </div>
                <img src={imgsrc10} height="50"/>



            <div className='but2'>
                <button className="but" onClick={() => navigate('/Post_cate')}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_basicInfo;
