import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSpace } from '../../store/spaceSlice';
import '../css/header.css';
import '../css/cate.css';
import Header from '../HeaderFooter/Header'
import Submenu from '../member/Submenu';


function Post_cate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cnum, setCnum] = useState("");  // 상태를 cnum으로 설정

    const handleChange = (event) => {
        setCnum(event.target.value); // 클릭된 값을 cnum 상태에 저장
        
    };

    function onSubmit() {
        // Redux 슬라이스에 선택된 cnum 저장
        dispatch(setSpace({ cnum })); // cnum을 객체 형태로 디스패치
        console.log(cnum); // 현재 상태 확인
        navigate('/Post_basicInfo'); // 다음 페이지로 이동
    }

    return (
        <div>
            <div className='rheader'>
            <div className='logo3'>공간 유형 선택</div>
            <div className='left'><Submenu /></div>
             </div>
            <div className='content'>
                11개의 공간 용도(파티룸, 연습실, 촬영스튜디오, 스터디룸, 공연장, 라이브방송, 세미나실, 악기연습실, 운동시설, 갤러리, 캠핑) 중 1개의 용도 안에서만 유형을 선택할 수 있습니다.<br />
                선택한 공간 용도 안에서, 등록한 공간에 적합한 유형은 모두 선택이 가능합니다.<br />
                검수 단계에서 검수 기준에 적합하지 않은 유형은 제외될 수 있습니다.<br />
                검수 신청 후, 공간 유형 변경은 고객센터를 통해서만 가능하오니, 신중히 선택해주세요!
            </div>
            <div className='radio-group'>
                {[
                    { value: '1', label: '파티룸' },
                    { value: '2', label: '연습실' },
                    { value: '3', label: '촬영스튜디오' },
                    { value: '4', label: '스터디룸' },
                    { value: '5', label: '공연장' },
                    { value: '6', label: '라이브방송' },
                    { value: '7', label: '세미나실' },
                    { value: '8', label: '악기연습실' },
                    { value: '9', label: '운동시설' },
                    { value: '10', label: '갤러리' },
                    { value: '11', label: '캠핑' }
                ].map(({ value, label }) => (
                    <label key={value} className={`radio-label ${cnum === value ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            value={value}
                            checked={cnum === value}
                            onChange={handleChange}
                            className='radio-input'
                        />
                        <span className='radio-box'>{label}</span>
                    </label>
                ))}
            </div>
            <div className='but2'>
                <button className="but" onClick={() => { navigate('/') }}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_cate;
