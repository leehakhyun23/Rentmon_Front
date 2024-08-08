import React from 'react'
import '../style/space.css';


function SpaceMenu() {
    return (
        <div className="SpaceMenu-container">
            <div className="SpaceMenu-item">공간소개</div>
            <div className="SpaceMenu-item">시설안내</div>
            <div className="SpaceMenu-item">주의사항</div>
            <div className="SpaceMenu-item">위치확인</div>
            <div className="SpaceMenu-item">채팅(문의)</div>
            <div className="SpaceMenu-item">리뷰</div>
        </div>
    )
}

export default SpaceMenu
