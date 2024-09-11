import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Fab, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
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

  const refreshNotificationCount = () => {
    const totalUnreadCount = chatRoomList.reduce(
      (total, chatRoom) => total + chatRoom.unreadCount,
      0
    );
    setNotificationCount(totalUnreadCount);
  };

  const refresChatRoomList = () => {
    axios.get('/api/admin/chatlist')
    .then((res) => {
      setChatRoomList(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    refresChatRoomList();

    const client = new Client({
      brokerURL: 'https://magracarta.pe.kr/ws',
      connectHeaders: {
        login: 'guest',
        passcode: 'guest',
      },
      debug: (str) => console.log(str),
      onConnect: () => {
        client.subscribe('/topic/admin/notifications', (message) => {
          const newMessage = JSON.parse(message.body);
          const crseq = newMessage.crseq;

          setChatRoomList(prevList => {
            return prevList.map(room => {
              if (room.crseq === crseq) {
                const isCurrentChatRoomOpen = selectedCrseq === crseq && currentView === 'room';
                return {
                  ...room,
                  lastMessage: newMessage.message,
                  lastSendTime: new Date().toLocaleString(),
                  unreadCount: isCurrentChatRoomOpen ? room.unreadCount : room.unreadCount + 1
                };
              }
              refresChatRoomList();
              refreshNotificationCount();
              return room;
            });
          });

          if (selectedCrseq !== crseq || currentView !== 'room') {
            setNotificationCount(prevCount => prevCount + 1);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      webSocketFactory: () => new SockJS('https://magracarta.pe.kr/ws'),
    });

    client.activate();

    return () => client.deactivate();
  }, [selectedCrseq, currentView]);

  useEffect(() => {
    refreshNotificationCount();
  }, [chatRoomList]);

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

  const handleMessagesRead = (crseq) => {
    setChatRoomList(prevList => 
      prevList.map(room => 
        room.crseq === crseq ? { ...room, unreadCount: 0 } : room
      )
    );
    refreshNotificationCount();
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
          <ChatRoom
            onBack={handleBack}
            crseq={selectedCrseq}
            nickName={selectedNickName}
            onMessagesRead={handleMessagesRead}
          />
        )
      )}
    </>
  );
};

export default FloatingActionButton;
