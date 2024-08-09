import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

function Post_payment() {
  // 상태 관리
  const navigate = useNavigate();
  const [bank, setBank] = useState('');
  const [accountnum, setAccountnum] = useState('');

  // 상태 업데이트 핸들러
  const handleBankChange = (event) => {
    setBank(event.target.value);
  };

  const handleAccountnumChange = (event) => {
    setAccountnum(event.target.value);
  };

  // 제출 핸들러
  const onSubmit = () => {
    console.log('은행명:', bank);
    console.log('계좌번호:', accountnum);

    // 여기에 서버로 데이터 전송 또는 다른 작업을 수행하는 코드 추가
  };

  return (
    <div>
      <div className='header2'>예약/정산 정보</div>
      <div>계좌 정보를 입력해주세요</div>
      
      <div>
        <label>
          은행명:
          <input type="text" value={bank} onChange={handleBankChange} placeholder="은행빼고 상호만 입력하세요" />
        </label>
      </div>
      <div>
        <label>
          계좌번호: <input type="text" value={accountnum} onChange={handleAccountnumChange} placeholder="계좌번호를 입력하세요"/>
        </label>
      </div>

      <div className="but2">
         <button className="but" onClick={ ()=>{ navigate('/Post_facility') } }>이전</button>
          <button className="but" onClick={ ()=>{ onSubmit() } }>다음</button>
        </div>
    </div>
  );
}

export default Post_payment;
