import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Submenu from '../member/Submenu';
import '../css/reviewManage.css'
import '../css/header.css'

function Report() {


    
return (
    <article>
        <div className='rheader'>
            <div className='logo3'>운영지표</div>
            <div className='left'><Submenu /></div>
        </div>
        <div>
            <select className='sel'>
                <option>공간 선택하기</option>
            </select>
        </div>
    </article>
)
}


export default Report;