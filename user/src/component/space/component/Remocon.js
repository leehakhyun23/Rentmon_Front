import React from 'react';
import { useNavigate } from 'react-router-dom';

function Remocon() {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate('/ReserveInsert');
  };

  return (
    <div className="remocon">
      <h2>공간 소개</h2>
      <button onClick={handleReservationClick}>예약하기</button>
    </div>
  );
}

export default Remocon;