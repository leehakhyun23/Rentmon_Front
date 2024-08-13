import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSpace } from '../../store/spaceSlice'; // 경로 조정 필요
import '../css/header.css';
import axios from 'axios'; 
import Cookies from 'js-cookie';

function Post_payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태에서 현재 정보 가져오기
  const currentSpace = useSelector((state) => state.space);

  // 폼 입력을 위한 로컬 상태
  const [bank, setBank] = useState('');
  const [accountnum, setAccountnum] = useState('');
  const [hostid, setHostid] = useState('');

  useEffect(() => {
    // 쿠키에서 hostid 가져오기
    const hostidCookie = Cookies.get('hostid');
    if (!hostidCookie || hostidCookie.trim() === '') {
      // hostid가 존재하지 않거나 빈 문자열인 경우 처리
      setHostid("e"); // 필요에 따라 적절한 값을 설정하세요
    } else {
      setHostid(hostidCookie);
    }
  }, []);

  // 입력 값 업데이트 핸들러
  const handleBankChange = (event) => {
    setBank(event.target.value);
  };

  const handleAccountnumChange = (event) => {
    setAccountnum(event.target.value);
  };
  // 공간 
  const sendSpaceData = async () => {
    await axios.post('/api/space/insertSpace', {
      hostid: hostid,
      cnum: currentSpace.cnum || '',
      title: currentSpace.title || '',
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
      starttime: currentSpace.starttime,
      endtime: currentSpace.endtime,
    });
  };

  const sendImgSrc = async () => {
    await axios.post('/api/space/insertImgSrc', {
      imgSrc: currentSpace.imgSrc || '',
    });
  };

  const sendDates = async () => {
    await axios.post('/api/space/insertClosed', {
      startDate: currentSpace.startDate,
      endDate: currentSpace.endDate,
    });
  };

  const sendBankInfo = async () => {
    await axios.post('/api/space/insertAccountNum', {
      bank,
      accountnum,
    });
  };

  // 제출 핸들러
  const onSubmit = async () => {
    try {
      // 콘솔로 데이터 출력
      console.log('Submitting data:', {
        cnum: currentSpace.cnum || '',
        title: currentSpace.title || '',
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
        starttime: currentSpace.starttime,
        endtime: currentSpace.endtime,
        startDate: currentSpace.startDate,
        endDate: currentSpace.endDate,
        monthholi: currentSpace.monthholi,
        weekholi: currentSpace.weekholi,
        dayholi: currentSpace.dayholi,
        fnum: currentSpace.fnum,
        bank,
        accountnum,
        hostid,
      });
  
      // Redux 상태 업데이트
      dispatch(setSpace({
        cnum: currentSpace.cnum || '',
        title: currentSpace.title || '',
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
        starttime: currentSpace.starttime,
        endtime: currentSpace.endtime,
        startDate: currentSpace.startDate,
        endDate: currentSpace.endDate,
        monthholi: currentSpace.monthholi,
        weekholi: currentSpace.weekholi,
        dayholi: currentSpace.dayholi,
        fnum: currentSpace.fnum,
        bank,
        accountnum,
        hostid,
      }));
      // 데이터 전송
      await Promise.all([
        sendSpaceData(),
        // sendImgSrc(),
        // sendDates(),
        // sendBankInfo(),
      ]);
  
      // 성공적으로 전송 후 페이지 이동
      navigate('/');
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div>
      <div className='header2'>예약/정산 정보</div>
      <div>계좌 정보를 입력해주세요</div>
      
      <div>
        <label>
          은행명:
          <input
            type="text"
            value={bank}
            onChange={handleBankChange}
            placeholder="은행빼고 상호만 입력하세요"
          />
        </label>
      </div>
      <div>
        <label>
          계좌번호:
          <input
            type="text"
            value={accountnum}
            onChange={handleAccountnumChange}
            placeholder="계좌번호를 입력하세요"
          />
        </label>
      </div>
      <div>
        여태까지 받았던 정보 출력 

      </div>
      <div className="but2">
        <button className="but" onClick={() => navigate('/Post_facility')}>이전</button>
        <button className="but" onClick={onSubmit}>다음</button>
      </div>
    </div>
  );
}

export default Post_payment;
