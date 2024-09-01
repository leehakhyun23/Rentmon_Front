import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jaxios from '../../util/jwtUtil';
import Iconbutton from './component/Iconbutton';
import ListIconButton from './component/ListIconButton';
import MypageSidebar from './component/MypageSidebar';
import SearchInputClick from './component/SearchInputClick';
import './css/headerfooter.css';
import Searchpopup from './Searchpopup';
import ChatRoom from '../chat/ChatRoom';
import Badge from '../chat/Badge';
import axios from 'axios';
import { useRef } from 'react';

function Header() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    // 서치 열기
    const [searchshow, setSearchshow] = useState({ display: "none" });
    const [searchPopup, setSearchPopup] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [listcount, setListcount] = useState(0);
    const recent = useSelector(state => state.recent);
    const menucount = recent.menucount;

    useEffect(() => {
        if (!searchPopup) setSearchshow({ display: "none" });
        else setSearchshow({ display: "block" });
    }, [searchPopup]);

    // 마이페이지 열기
    const [mypageShow, setMypageShow] = useState({ right: "-100%" });
    const [mypagePopup, setMypagePopup] = useState(false);
    const [mypageBlack, setMypageBlack] = useState({ display: "none" });

    useEffect(() => {
        setListcount(menucount.reservCount);
    }, [recent]);

    useEffect(() => {
        if (!mypagePopup) {
            setMypageShow({ right: "-100%" });
            setMypageBlack({ display: "none" });
        } else {
            setMypageShow({ right: "0%" });
            setMypageBlack({ display: "block" });
        }
    }, [mypagePopup]);

    // 채팅방 관련 상태
    const [chatRoomOpen, setChatRoomOpen] = useState(false);
    const chatRoomOpenRef = useRef(chatRoomOpen); // 최신 상태를 참조할 ref 생성
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [crseq, setCrseq] = useState(null);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        chatRoomOpenRef.current = chatRoomOpen; // 상태 변경 시 ref 업데이트
    }, [chatRoomOpen]);

    // WebSocket 연결 함수
    const connectWebSocket = (crseq) => {
        const client = new Client({
            brokerURL: 'ws://localhost:8070/ws',
            connectHeaders: {
                login: 'guest',
                passcode: 'guest',
            },
            onConnect: () => {
                client.subscribe(`/topic/chatroom/${crseq}`, (message) => {
                    const newMessage = JSON.parse(message.body);

                    if (newMessage.senderType === "admin") {
                        if (!chatRoomOpenRef.current) { // ref를 사용하여 최신 상태 확인
                            setUnreadMessages(prev => prev + 1);
                        } else {
                            axios.post(`/api/chat/markAsRead/${crseq}`)
                        }
                    }
                });
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            },
            webSocketFactory: () => new SockJS('http://localhost:8070/ws'),
        });

        client.activate();
        setStompClient(client);
    };

    // 사용자의 채팅방 구독
    useEffect(() => {
        if (user && user.userid) {
            jaxios.get('/api/user/getCrseq', { params: { userid: user.userid } })
                .then((res) => {
                    if (res.status === 200) {
                        const { crseq, unreadMessages } = res.data;
                        setUnreadMessages(unreadMessages);
                        setCrseq(crseq);
                        connectWebSocket(crseq);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [user]);

    // 채팅방 열기
    const openChatRoom = () => {
        setUnreadMessages(0);  // 뱃지 숫자 초기화
        setChatRoomOpen(true);
    };

    // 채팅방 닫기
    const closeChatRoom = () => {
        setChatRoomOpen(false);
    };

    return (
        <>
            <div className='header'>
                <div className='innerContainer'>
                    <div className='mo'><Iconbutton src={"/img/searchIconblack.svg"} click={() => setSearchPopup(true)} /></div>
                    <div className='logo' onClick={() => navigate("/")}><h2>RENTMON</h2></div>
                    <div className='left'>
                        <div>
                            <div className='pc'>{(searchPopup) ? (null) : <SearchInputClick searchWord={searchWord} setSearchPopup={setSearchPopup} />}</div>
                            {/* 채팅 뱃지 표시 */}
                            <Badge count={unreadMessages}>
                                <Iconbutton src={"/img/chatIcon.svg"} click={openChatRoom} />
                            </Badge>
                            <Iconbutton src={"/img/peopleIcon.svg"} click={() => setMypagePopup(true)} />
                            {(user.name) && (<ListIconButton click={() => navigate("/mypage/reservation/1")} listcount={listcount} />)}
                        </div>
                    </div>
                </div>
            </div>
            {/* 서치팝업 창 */}
            <Searchpopup searchshow={searchshow} searchWord={searchWord} setSearchWord={setSearchWord} setSearchPopup={setSearchPopup} />
            {/* 마이페이지 사이드바 메뉴 */}
            <MypageSidebar mypagePopup={mypagePopup} loginOn={(user.name) ? (true) : (false)} mypageShow={mypageShow} setMypagePopup={setMypagePopup} mypageBlack={mypageBlack} />
            {/* 채팅방 팝업 */}
            {chatRoomOpen && (
                <ChatRoom user={user} closeChatRoom={closeChatRoom} />
            )}
        </>
    );
}

export default Header;
