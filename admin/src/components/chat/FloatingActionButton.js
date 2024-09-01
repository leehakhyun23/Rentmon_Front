import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Fab, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ChatList from './ChatList'; // ChatList 컴포넌트
import ChatRoom from './ChatRoom'; // ChatRoom 컴포넌트
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const FabStyled = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [chatRoomList, setChatRoomList] = useState([]);
  const [selectedCrseq, setSelectedCrseq] = useState(null);
  const [selectedNickName, setSelectedNickName] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    axios.get('/api/admin/chatlist')
      .then((res) => {
        setChatRoomList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    const client = new Client({
      brokerURL: 'http://localhost:8070/ws',
      connectHeaders: {
        login: 'guest',
        passcode: 'guest',
      },
      debug: (str) => console.log(str),
      onConnect: () => {
        client.subscribe('/topic/messages', (message) => {
 
          setNotificationCount(prevCount => prevCount + 1);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      webSocketFactory: () => new SockJS('http://localhost:8070/ws'),
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  const handleFabClick = () => {
    setIsOpen(prevOpen => !prevOpen);
  };

  const handleSelectChat = (crseq) => {
    const selectedRoom = chatRoomList.find(room => room.crseq === crseq);
    if (selectedRoom) {
      setSelectedNickName(selectedRoom.nickName);
    }
    setSelectedCrseq(crseq);
    setCurrentView('room');
  };

  const handleBack = () => {
    setCurrentView('list');
  };

  return (
    <>
      <FabStyled color="primary" aria-label="messages" onClick={handleFabClick}>
        <Badge badgeContent={notificationCount} color="secondary" overlap="circular">
          <MailIcon />
        </Badge>
      </FabStyled>
      {isOpen && (
        currentView === 'list' ? (
          <ChatList onSelectChat={handleSelectChat} chatRoomList={chatRoomList} />
        ) : (
          <ChatRoom onBack={handleBack} crseq={selectedCrseq} nickName={selectedNickName} />
        )
      )}
    </>
  );
};

export default FloatingActionButton;
