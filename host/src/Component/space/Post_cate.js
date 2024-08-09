import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/header.css';

function Post_cate() {

    const navigate=useNavigate();
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    async function onSubmit (){
        try{
            let numericValue = parseInt(selectedValue, 10);
            let result = await axios.post('/api/space/cate',{cnum: numericValue });
            alert('일단 여기까진 된거임');
        }catch(err){
            console.error('서버에 데이터 전송 실패:',err);
        }
    };
    
    
    return (
        <div>
            <div className='header2'>공간 유형 선택</div>
            <div>
                11개의 공간 용도(파티룸, 연습실, 촬영스튜디오, 스터디룸, 공연장, 라이브방송, 세미나실, 악기연습실, 운동시설, 갤러리 , 캠핑) 중 1개의 용도 안에서만 유형을 선택할 수 있습니다.<br />
                선택한 공간 용도 안에서, 등록한 공간에 적합한 유형은 모두 선택이 가능합니다.<br />
                검수 단계에서 검수 기준에 적합하지 않은 유형은 제외될 수 있습니다.<br />
                검수 신청 후, 공간 유형 변경은 고객센터를 통해서만 가능하오니, 신중히 선택해주세요!
            </div>
            <div>
            <label>
                파티룸
                <input
                    type="radio"
                    value="1"
                    checked={selectedValue === '1'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                연습실
                <input
                    type="radio"
                    value="2"
                    checked={selectedValue === '2'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                촬영스튜디오
                <input
                    type="radio"
                    value="3"
                    checked={selectedValue === '3'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                스터디룸
                <input
                    type="radio"
                    value="4"
                    checked={selectedValue === '4'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                공연장
                <input
                    type="radio"
                    value="5"
                    checked={selectedValue === '5'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                라이브방송
                <input
                    type="radio"
                    value="6"
                    checked={selectedValue === '6'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                세미나실
                <input
                    type="radio"
                    value="7"
                    checked={selectedValue === '7'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                악기연습실
                <input
                    type="radio"
                    value="8"
                    checked={selectedValue === '8'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                운동시설
                <input
                    type="radio"
                    value="9"
                    checked={selectedValue === '9'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                갤러리
                <input
                    type="radio"
                    value="10"
                    checked={selectedValue === '10'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                캠핑
                <input
                    type="radio"
                    value="11"
                    checked={selectedValue === '11'}
                    onChange={handleChange}
                />
                <br />
            </label>
            
        </div>
            <div> <button onClick={ ()=>{ navigate('/main') } }>이전</button>
            <button onClick={ ()=>{ onSubmit() } }>다음</button></div>
        </div>

        
    );
}

export default Post_cate;