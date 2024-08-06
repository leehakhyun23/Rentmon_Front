import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

function Post_useInfo() {
    const navigate = useNavigate();
    const [starttime, setStarttime] = useState('00');
    const [endtime, setEndtime] = useState('00');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [monthholi, setMonthholi] = useState([]);
    const [weekholi, setWeekholi] = useState([]);
    const [dayholi, setDayholi] = useState(new Date());
    const [dropdownValue, setDropdownValue] = useState('option1');

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
            // Ensure monthholi is an empty array
            setMonthholi([]);
        }
        if (value === 'option2') {
            // Ensure weekholi is an empty array
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

    const onSubmit = () => {
        console.log('Start Time:', starttime);
        console.log('End Time:', endtime);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Monthholi Dates:', monthholi);
        console.log('Weekholi Dates:', weekholi);
        console.log('Dayholi Date:', dayholi);
    };

    return (
        <div>
            <div>
                <span>이용안내</span>
            </div>
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
                <span>시작일</span>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy MM dd (eeee)"
                    locale={ko}
                    placeholderText="Select start date"
                />
            </div>
            <div>
                <span>마감일</span>
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
            <div>
                <button onClick={() => navigate('/Post_basicInfo')}>이전</button>
                <button onClick={onSubmit}>다음</button>
            </div>
        </div>
    );
}

export default Post_useInfo;
