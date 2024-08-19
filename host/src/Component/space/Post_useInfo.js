import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSpace } from '../../store/spaceSlice'; // Redux slice import
import 'react-datepicker/dist/react-datepicker.css';
import '../css/header.css';

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
            imgSrc: currentSpace.imgSrc || '',
            starttime,
            //: updatedStartDate.toISOString(),
            endtime,
            // : updatedEndDate.toISOString(),
        }));

        navigate('/Post_facility');
    };

    return (
        <div>
            <div className='header2'>이용안내</div>
            <div>
                <span>이용 시간</span>
                <select
                    value={starttime}
                    onChange={(e) => handleOnChange(e, setStarttime)}
                >
                    {[...Array(24).keys()].map(hour => (
                        <option key={hour} value={String(hour).padStart(2, '0')}>
                            {String(hour).padStart(2, '0')}
                        </option>
                    ))}
                </select>
                <span> ~ </span>
                <select
                    value={endtime}
                    onChange={(e) => handleOnChange(e, setEndtime)}
                >
                    {[...Array(25).keys()].map(hour => (
                        <option key={hour} value={String(hour).padStart(2, '0')}>
                            {String(hour).padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
            <div className="but2 ">
                <button className="but" onClick={() => navigate('/Post_basicInfo')}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_useInfo;
