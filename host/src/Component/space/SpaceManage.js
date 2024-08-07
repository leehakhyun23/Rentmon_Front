import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SpaceManage() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 데이터 가져오기 함수
        const fetchSpaces = async () => {
            try {
                const response = await axios.get('/api/spaces'); // 서버에서 장소 데이터 가져오기
                setSpaces(response.data); // 상태 업데이트
                setLoading(false); // 로딩 완료
            } catch (err) {
                setError(err); // 에러 처리
                setLoading(false); // 로딩 완료
            }
        };

        fetchSpaces();
    }, []); // 컴포넌트 마운트 시 데이터 가져오기

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 상태
    }

    if (error) {
        return <div>데이터를 가져오는 데 문제가 발생했습니다.</div>; // 에러 상태
    }

    return (
        <div>
            <div>내 장소 관리</div>
            <button onClick={() => navigate('/Post_cate')}>장소 등록</button>
        
            <div>
                {spaces.length > 0 ? (
                    <ul>
                        {spaces.map(space => (
                            <li key={space.id}>
                                {space.name}
                                <button>수정</button>
                                <button>삭제</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>장소가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default SpaceManage;
