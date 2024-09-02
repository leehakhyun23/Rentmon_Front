import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Typography, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
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
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  overflow: 'hidden',
}));

const HeaderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const MessagesContainer = styled('div')(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  marginBottom: theme.spacing(2),
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.grey[400]} transparent`,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

const FooterStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const MessageStyled = styled('div')(({ theme, isAdmin }) => ({
  display: 'flex',
  justifyContent: isAdmin ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
}));

const MessageContent = styled('div')(({ theme, isAdmin }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1),
  backgroundColor: isAdmin ? theme.palette.primary.light : theme.palette.grey[200],
  color: isAdmin ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
}));

const ChatRoom = ({ onBack, crseq, nickName, onMessagesRead }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let client;
  
    const connectWebSocket = () => {
      client = new Client({
        brokerURL: 'http://localhost:8070/ws',
        connectHeaders: {
          login: 'admin',
          passcode: 'admin',
        },
        debug: (str) => console.log(str),
        onConnect: () => {
          client.subscribe(`/topic/chatroom/${crseq}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
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
  
    if (crseq) {
      axios.get(`/api/admin/chatroom/${crseq}`)
        .then((res) => {
          if (res.status === 200 && res.data) {
            setChatMessages(res.data);

            axios.post(`/api/admin/chatroom/${crseq}/markRead`)
              .then(() => {
                console.log(`Messages in chatroom ${crseq} marked as read`);
                if (onMessagesRead) onMessagesRead(crseq);
              })
              .catch((err) => {
                console.error(`Failed to mark messages as read: ${err}`);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
  
      connectWebSocket();
    }
  
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [crseq]);

  const formatDateToTimestamp = (date) => {
    return date.getFullYear() + "-" 
        + String(date.getMonth() + 1).padStart(2, '0') + "-" 
        + String(date.getDate()).padStart(2, '0') + " " 
        + String(date.getHours()).padStart(2, '0') + ":" 
        + String(date.getMinutes()).padStart(2, '0') + ":" 
        + String(date.getSeconds()).padStart(2, '0');
  };
  
  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage = {
        type: "CHAT",
        senderType: "admin",
        message: message.trim(),
        isRead: false,
        createdAt: formatDateToTimestamp(new Date()),
        chatroom: {
            crseq: crseq
        },
    };

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: `/app/chatroom/${crseq}/send`,
            body: JSON.stringify(newMessage),
        });
    }

    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleTimeString();
  };

  return (
    <ChatRoomStyled>
      <HeaderStyled>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {nickName}
        </Typography>
      </HeaderStyled>

      <MessagesContainer>
        {chatMessages.map((msg, index) => (
          <MessageStyled key={index} isAdmin={msg.senderType === 'admin'}>
            <MessageContent isAdmin={msg.senderType === 'admin'}>
              <p>{msg.message}</p>
              <small>{formatDate(msg.createdAt)}</small>
            </MessageContent>
          </MessageStyled>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <FooterStyled>
        <TextField
          variant="outlined"
          placeholder="Type a message"
          multiline
          minRows={1}
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          sx={{ marginRight: 1 }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </FooterStyled>
    </ChatRoomStyled>
  );
};

export default ChatRoom;
