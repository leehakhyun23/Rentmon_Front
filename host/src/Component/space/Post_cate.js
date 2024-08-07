import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Post_cate() {

    const navigate=useNavigate();
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const onSubmit = ()=> {

    };

    return (
        <div>
            <div>공간 유형 선택</div>
            <div>
                6개의 공간 용도(모임, 연습, 촬영, 행사, 캠핑, 오피스) 중 1개의 용도 안에서만 유형을 선택할 수 있습니다.<br />
                선택한 공간 용도 안에서, 등록한 공간에 적합한 유형은 모두 선택이 가능합니다.<br />
                검수 단계에서 검수 기준에 적합하지 않은 유형은 제외될 수 있습니다.<br />
                검수 신청 후, 공간 유형 변경은 고객센터를 통해서만 가능하오니, 신중히 선택해주세요!
            </div>
            <div>
            <label>
                모임공간
                <input
                    type="radio"
                    value="option1"
                    checked={selectedValue === 'option1'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                연습공간
                <input
                    type="radio"
                    value="option2"
                    checked={selectedValue === 'option2'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                촬영공간
                <input
                    type="radio"
                    value="option3"
                    checked={selectedValue === 'option3'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                행사공간
                <input
                    type="radio"
                    value="option4"
                    checked={selectedValue === 'option4'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                캠핑공간
                <input
                    type="radio"
                    value="option5"
                    checked={selectedValue === 'option5'}
                    onChange={handleChange}
                />
                <br />
            </label>
            <label>
                오피스공간
                <input
                    type="radio"
                    value="option6"
                    checked={selectedValue === 'option6'}
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