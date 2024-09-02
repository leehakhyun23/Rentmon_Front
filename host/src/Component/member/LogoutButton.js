import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import hostSlice, { logoutAction } from '../../store/HostSlice'; // 로그아웃 액션을 임포트합니다
import { removeCookie } from '../../util/cookieUtil'; // 쿠키를 삭제하는 유틸리티 함수

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    // 쿠키에서 토큰 제거
    removeCookie("token");

    // 리덕스 상태 초기화
    dispatch(logoutAction());

    // 로그아웃 후 홈 페이지로 리다이렉트
    navigate("/");
    alert("로그아웃이 완료되셨습니다.");
  };

  return (
    <button onClick={onLogout}  className='loginbtn'>로그아웃</button>
  );
}

export default LogoutButton;
