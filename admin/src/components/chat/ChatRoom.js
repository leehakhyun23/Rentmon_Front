import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatRoomStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(2),
  width: '300px',
  height: '400px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  zIndex: 999,
  padding: theme.spacing(2),
}));

const HeaderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ChatRoom = ({ onBack }) => {
  return (
    <ChatRoomStyled>
      <HeaderStyled>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chat Room
        </Typography>
      </HeaderStyled>

    </ChatRoomStyled>
  );
};

export default ChatRoom;
