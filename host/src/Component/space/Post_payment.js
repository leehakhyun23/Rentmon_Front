import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSpace } from '../../store/spaceSlice'; // 경로 조정 필요
import Header from '../HeaderFooter/Header'
import '../css/reviewManage.css'
import '../css/header.css';
import '../css/payment.css';
import axios from 'axios'; 
import Cookies from 'js-cookie';
import Submenu from '../member/Submenu';

function Post_payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  // Redux 상태에서 현재 정보 가져오기
  const currentSpace = useSelector((state) => state.space);
  const hostid = useSelector((state) => state.host.hostid);
  // 폼 입력을 위한 로컬 상태
  const [bank, setBank] = useState('');
  const [accountnum, setAccountnum] = useState('');
  const [localHostid, setLocalHostid] = useState('');

  useEffect(() => {
    // Redux에서 가져온 hostid를 로컬 상태로 설정
    if (hostid) {
      setLocalHostid(hostid);
    }
  }, [hostid]);

  // 입력 값 업데이트 핸들러
  const handleBankChange = (event) => {
    setBank(event.target.value);
  };

  const handleAccountnumChange = (event) => {
    setAccountnum(event.target.value);
  };

  // 제출 핸들러
  const onSubmit = async () => {
    try {
      // 1. Insert space and get sseq
      const spaceResponse = await axios.post('/api/space/insertSpace', {
        hostid: hostid,
        cnum: currentSpace.cnum || '',
        title: currentSpace.title || '',
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
        starttime: currentSpace.starttime,
        endtime: currentSpace.endtime,
        address: currentSpace.address,
      });
  
      // Extract sseq from response
      const sseq = spaceResponse.data;
      console.log(sseq);
      console.log(Array.isArray(currentSpace.fnum) ? currentSpace.fnum : [currentSpace.fnum]);
      // 2. Insert fnum with sseq
      await axios.post('/api/space/insertfnum', {
        sseq: sseq,
        numbers: Array.isArray(currentSpace.fnum) ? currentSpace.fnum : [currentSpace.fnum],
      }, {
        headers: {
            'Content-Type': 'application/json',
        }
      });
      console.log(currentSpace.rList);
      console.log(currentSpace.oList);
      // 3. Optionally, handle imgList or other data here if needed
      await axios.post('/api/space/insertImgSrc', {
        sseq: sseq,
        originalnames: currentSpace.oList, // 배열로 전달
        realnames: currentSpace.rList, // 배열로 전달
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
  
      // Success: navigate or handle as needed
      navigate('/');
  
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className='form-container'>
       <div className='rheader'>
                <div className='logo3'>예약/정산 정보</div>
                <div className='left'><Submenu /></div>
            </div>
      <div className='select-container'>
        <label className='option-label'>
          은행
          <select className='select' value={bank} onChange={handleBankChange}>
            <option value="">선택하세요</option>
            <option value="1">한국은행</option>
            <option value="2">신한은행</option>
            <option value="3">국민은행</option>
            <option value="4">우리은행</option>
            <option value="5">하나은행</option>
            <option value="6">기업은행</option>
            <option value="7">농협은행</option>
            <option value="8">수협은행</option>
            <option value="9">한국씨티은행</option>
            <option value="10">대구은행</option>
            <option value="11">전북은행</option>
            <option value="12">부산은행</option>
            <option value="13">제주은행</option>
            <option value="14">제일은행</option>
            <option value="15">경남은행</option>
            <option value="16">케이뱅크</option>
            <option value="17">카카오뱅크</option>
            <option value="18">토스뱅크</option>
          </select>
        </label>
      </div>
      
      <div className='input-container'>
        <label>
          계좌번호
          <input
            type="text"
            value={accountnum}
            onChange={handleAccountnumChange}
            placeholder="계좌번호를 입력하세요"
          />
        </label>
      </div>
      <div className="but2">
        <button className="but" onClick={() => navigate('/Post_facility')}>이전</button>
        <button className="but" onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
}

export default Post_payment;
