import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSpace } from '../../store/spaceSlice'; // Redux slice import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import '../css/header.css';

function Post_useInfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve current space information from Redux state
    const currentSpace = useSelector((state) => state.space);

    //내가 추가한거 
    const baseDate = new Date(1998, 5, 23, 1, 0, 0); // 1998년 6월 23일 01시 00분 00초
    

    const [starttime, setStarttime] = useState(currentSpace.starttime);
    const [endtime, setEndtime] = useState(currentSpace.endtime);
    const [startDate, setStartDate] = useState(currentSpace.startDate ? new Date(currentSpace.startDate) : null);
    const [endDate, setEndDate] = useState(currentSpace.endDate ? new Date(currentSpace.endDate) : null);
    const [monthholi, setMonthholi] = useState(currentSpace.monthholi || []);
    const [weekholi, setWeekholi] = useState(currentSpace.weekholi || []);
    const [dayholi, setDayholi] = useState([]);
    const [dropdownValue, setDropdownValue] = useState(currentSpace.dropdownValue || 'option1');

    const handleOnChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        setDropdownValue(value);
        if (value === 'option1') {
            setMonthholi([]);
        }
        if (value === 'option2') {
            setWeekholi([]);
        }
        if (value === 'option3') {
            setDayholi(new Date());
        }
    };

    const handleCheckboxChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setMonthholi((prevMonthholi) =>
            prevMonthholi.includes(value)
                ? prevMonthholi.filter(day => day !== value)
                : [...prevMonthholi, value]
        );
    };

    //내가 추가한거
    const updatedStartDate = new Date(baseDate);
        updatedStartDate.setHours(parseInt(starttime, 10));
        updatedStartDate.setMinutes(0);
        updatedStartDate.setSeconds(0);

        const updatedEndDate = new Date(baseDate);
        updatedEndDate.setHours(parseInt(endtime, 10));
        updatedEndDate.setMinutes(0);
        updatedEndDate.setSeconds(0);

    const onSubmit = () => {
        dispatch(setSpace({
            cnum: currentSpace.cnum || '', // Use existing cnum
            title: currentSpace.title || '', // Maintain existing values
            subtitle: currentSpace.subtitle || '',
            price: currentSpace.price || '',
            personnal: currentSpace.personnal || '',
            maxpersonnal: currentSpace.maxpersonnal || '',
            content: currentSpace.content || '',
            caution: currentSpace.caution || '',
            zipcode: currentSpace.zipcode || '',
            province: currentSpace.province || '',
            town: currentSpace.town || '',
            village: currentSpace.village || '',
            address_detail: currentSpace.address_detail || '',
            imgSrc: currentSpace.imgSrc || '',
            starttime: updatedStartDate.toISOString(),
            endtime: updatedEndDate.toISOString(),
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            monthholi,
            weekholi,
            dayholi,
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
            <div>
                <span>휴가 시작일</span>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy MM dd (eeee)"
                    locale={ko}
                    placeholderText="Select start date"
                />
            </div>
            <div>
                <span>휴가 마감일</span>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy MM dd (eeee)"
                    locale={ko}
                    placeholderText="Select end date"
                    minDate={startDate}
                />
            </div>
            <div>
                <span>정기 휴무일</span>
                <select id="myDropdown" value={dropdownValue} onChange={handleDropdownChange}>
                    <option value="option1">매월</option>
                    <option value="option2">매주</option>
                    <option value="option3">직접선택</option>
                </select>
                {dropdownValue === 'option1' && (
                    <div>
                        <h2>휴무일 선택</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '600px' }}>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <label key={day} style={{ marginRight: '10px', marginBottom: '5px' }}>
                                    <input
                                        type="checkbox"
                                        value={day}
                                        checked={monthholi.includes(day)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {day}일
                                </label>
                            ))}
                        </div>
                        <div>
                            <strong>선택된 날짜:</strong> {monthholi.join(', ')}
                        </div>
                    </div>
                )}
                {dropdownValue === 'option2' && (
                    <div>
                        월<input type="checkbox" value="1" />
                        화<input type="checkbox" value="2" />
                        수<input type="checkbox" value="3" />
                        목<input type="checkbox" value="4" />
                        금<input type="checkbox" value="5" />
                        토<input type="checkbox" value="6" />
                        일<input type="checkbox" value="7" />
                    </div>
                )}
                {dropdownValue === 'option3' && (
                    <div>
                        <DatePicker
                            selected={dayholi}
                            onChange={(date) => setDayholi(date)}
                            dateFormat="yyyy MM dd (eeee)"
                            locale={ko}
                            placeholderText="Select date"
                        />
                    </div>
                )}
            </div>
            <div className="but2 ">
                <button className="but" onClick={() => navigate('/Post_basicInfo')}>이전</button>
                <button className="but" onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_useInfo;
