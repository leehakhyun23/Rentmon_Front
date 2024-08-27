import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const FabStyled = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1000,
}));

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [chatRoomList, setChatRoomList] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/chatlist")
    .then((res) => {
      setChatRoomList(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  const handleFabClick = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleSelectChat = (chatId) => {
    setCurrentView('room');
  };

  const handleBack = () => {
    setCurrentView('list');
  };

  return (
    <>
      <FabStyled color="primary" aria-label="messages" onClick={handleFabClick}>
        <Badge badgeContent={3} color="secondary" overlap="circular">
          <MailIcon />
        </Badge>
      </FabStyled>
      {isOpen && (
        currentView === 'list' ? (
          <ChatList onSelectChat={handleSelectChat} chatRoomList={chatRoomList}/>
        ) : (
          <ChatRoom onBack={handleBack} />
        )
      )}
    </>
  );
};

export default FloatingActionButton;
