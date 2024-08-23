import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSpace } from '../../store/spaceSlice'; // Redux slice import
import 'react-datepicker/dist/react-datepicker.css';
import '../css/header.css';
import '../css/useInfo.css';
import Header from '../HeaderFooter/Header'
import Submenu from '../member/Submenu';
function Post_useInfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve current space information from Redux state
    const currentSpace = useSelector((state) => state.space);

    const [starttime, setStarttime] = useState('');
    const [endtime, setEndtime] = useState('');

    const handleOnChange = (e, setter) => {
        setter(e.target.value);
    };

    const onSubmit = () => {
        dispatch(setSpace({
            cnum: currentSpace.cnum || '', // Use existing cnum
            title: currentSpace.title || '', // Maintain existing values
            subtitle: currentSpace.subtitle || '',
            price: currentSpace.price || '',
            maxpersonnal: currentSpace.maxpersonnal || '',
            content: currentSpace.content || '',
            caution: currentSpace.caution || '',
            zipcode: currentSpace.zipcode || '',
            province: currentSpace.province || '',
            town: currentSpace.town || '',
            village: currentSpace.village || '',
            address_detail: currentSpace.address_detail || '',
            rList: currentSpace.rList || [],
            oList: currentSpace.oList || [],
            starttime,
            endtime,
            address : currentSpace.address,
        }));

        navigate('/Post_facility');
    };

    return (
        <div className="container">
            <div className='rheader'>
            <div className='logo3'>이용 안내</div>
            <div className='left'><Submenu /></div>
        </div>
            <div className='time-container'>
                <span className='time-label'>이용 시간</span>
                <select
                    className='time-select'
                    value={starttime}
                    onChange={(e) => handleOnChange(e, setStarttime)}
                >
                    <option value="" disabled>선택</option>
                    {[...Array(24).keys()].map(hour => (
                        <option key={hour} value={String(hour).padStart(2, '0')}>
                            {String(hour).padStart(2, '0')}
                        </option>
                    ))}
                </select>
                <span> ~ </span>
                <select
                    className='time-select'
                    value={endtime}
                    onChange={(e) => handleOnChange(e, setEndtime)}
                >
                    <option value="" disabled>선택</option>
                    {[...Array(25).keys()].map(hour => (
                        <option key={hour} value={String(hour).padStart(2, '0')}>
                            {String(hour).padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
            <div className="but2">
                <button className="but" onClick={() => navigate('/Post_basicInfo')}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_useInfo;
