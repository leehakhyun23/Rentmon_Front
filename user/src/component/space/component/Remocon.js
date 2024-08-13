import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function Remocon({ space }) {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/ReservationForm/${space.sseq}`, {
      state: {
        startDate,
        startTime,
        endTime,
      },
    });
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    value: `${i.toString().padStart(2, '0')}:00`,
    label: `${i.toString().padStart(2, '0')}:00`,
  }));

  return (
    <div className="remocon">
      <h2>공간 소개</h2>

      <form onSubmit={handleSubmit} className="reservation-form">
        <label>
          예약 날짜:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          시작 시간:
          <Select
            options={timeOptions}
            value={timeOptions.find(option => option.value === startTime)}
            onChange={(option) => setStartTime(option.value)}
            placeholder="시간 선택"
            required
          />
        </label>
        <label>
          종료 시간:
          <Select
            options={timeOptions}
            value={timeOptions.find(option => option.value === endTime)}
            onChange={(option) => setEndTime(option.value)}
            placeholder="시간 선택"
            required
          />
        </label>
        <button type="submit">예약하기</button>
      </form>
    </div>
  );
}

export default Remocon;