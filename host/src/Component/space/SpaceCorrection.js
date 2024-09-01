import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/header.css';
import '../css/SpaceCorrection.css';
import Header from '../HeaderFooter/Header'
import '../css/reviewManage.css'
import Submenu from '../member/Submenu';

function SpaceCorrection() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const sseq = queryParams.get('sseq');
    const title = queryParams.get('title');
    const imageName = queryParams.get('imageName');

    // 버튼 클릭 핸들러
    const handleButtonClick = (path) => {
        navigate(path + `?sseq=${sseq}`); // 지정된 경로로 이동하면서 sseq를 쿼리 파라미터로 전달
    };

    return (
        <div className="container">
              <div className='rheader'>
                <div className='logo3'>공간 수정</div>
                <div className='left'><Submenu /></div>
            </div>
            <div>
                {imageName && (
                    <img 
                        src={`http://localhost:8070/space_images/${imageName}`} 
                        alt={title} 
                        className="space-image" 
                    />
                )}
            </div>
            {/* 공간 수정 폼을 여기에 추가 */}
            <form>
                <div>
                    <input type="text" value={title} readOnly />
                </div>
                {/* 기타 수정할 입력 필드를 추가할 수 있습니다. */}
            </form>
            <div className="button-container1">
                <button onClick={() => handleButtonClick('/host/Col_basicInfo')}>기본 정보</button>
                <button onClick={() => handleButtonClick('/host/Col_facility')}>시설 정보</button>
                <button onClick={() => handleButtonClick('/host/Col_useInfo')}>이용 안내</button>
                
            </div>
        </div>
    );
}

export default SpaceCorrection;
