import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import '../css/header.css'; // 스타일 시트
import '../css/SpaceManage.css';
import Header from '../HeaderFooter/Header';
import Submenu from '../member/Submenu';
import '../css/reviewManage.css'


function SpaceManage() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const host = useSelector(state => state.host);
    const navigate = useNavigate();
    const hostid = useSelector((state) => state.host.hostid); // Redux에서 hostid 가져오기

    useEffect(() => {
        // 정보를 수정할 때만 경고를 띄우도록 수정
        if (host.hostid || host.provider !== 'kakao') {
            if (!host.hostid) {
                alert('로그인이 필요한 서비스입니다');
                navigate('/');
            }
        }
    }, [host, navigate]);

    useEffect(() => {
        // 데이터 가져오기 함수
        const fetchSpaces = async () => {
            try {
                // 서버에서 장소 데이터 가져오기
                const response = await axios.get(`/api/space/spaces?hostid=${hostid}`);
                setSpaces(response.data); // 상태 업데이트
                setLoading(false); // 로딩 완료
                console.log(response.data);
            } catch (err) {
                setError(err); // 에러 처리
                setLoading(false); // 로딩 완료
            }
        };

        fetchSpaces();
    }, [hostid]); // hostid가 변경될 때마다 데이터 가져오기

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 상태
    }

    if (error) {
        return <div>데이터를 가져오는 데 문제가 발생했습니다.</div>; // 에러 상태
    }

    const handleEditClick = (sseq, title, imageName) => {
        navigate(`/SpaceCorrection?sseq=${sseq}&title=${encodeURIComponent(title)}&imageName=${encodeURIComponent(imageName)}`);
    };

    const handleDeleteClick = async (sseq) => {
        try {
            // 서버에 삭제 요청 보내기
            const response = await axios.delete(`/api/space/delete/${sseq}`);

            if (response.status === 200) {
                // 삭제 성공 시, 해당 항목을 화면에서 제거
                setSpaces((prevSpaces) => prevSpaces.filter(space => space.sseq !== sseq));
                console.log('장소가 성공적으로 삭제되었습니다.');
            } else {
                console.error('장소 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('삭제 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div>
            <div className='rheader'>
                <div className='logo3'>내 장소 관리</div>
                <div className='left'><Submenu /></div>
            </div>
            <div className='register-button-container'>
                <button className='register-button' onClick={() => navigate('/Post_cate')}>장소 등록</button>
            </div>
        
            <div>
                {spaces.length > 0 ? (
                    <ul className="space-list">
                        {spaces.map(space => {
                            const firstImage = space.spaceimage[0]?.realName; // 첫 번째 이미지의 realName
                            const imageUrl = firstImage ? `https://rentmon-jb.s3.ap-northeast-2.amazonaws.com/space_images/${firstImage}` : ''; // 이미지 URL 설정
                            
                            return (
                                <li key={space.sseq} className="space-item">
                                    {imageUrl && (
                                        <img src={imageUrl} alt={space.title} className="space-image" />
                                    )}
                                    <div className="space-title">{space.title}</div>
                                    <div className="button-container">
                                        <button 
                                            className='button'
                                            onClick={() => handleEditClick(space.sseq, space.title, firstImage)} // sseq, title, imageName 전달
                                        >
                                            수정
                                        </button>
                                        <button 
                                            className='button1'
                                            onClick={() => handleDeleteClick(space.sseq)} // sseq 전달
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div>장소가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default SpaceManage;
