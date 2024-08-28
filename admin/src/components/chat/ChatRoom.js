import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

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

const ChatRoom = ({ onBack, crseq }) => {
  useEffect(() => {
    if (crseq) {
      axios.get(`/api/admin/chatroom/${crseq}`)
        .then((res) => {
          if (res.status === 200) {
            // 데이터를 받아와서 상태에 저장하거나 화면에 표시
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [crseq]);

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

      {/* 채팅 메시지 표시 */}
    </ChatRoomStyled>
  );
};

export default ChatRoom;
