import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const ChatListStyled = styled(List)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(2),
  width: '300px',
  maxHeight: '400px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  zIndex: 999,
}));

const ChatList = ({ onSelectChat, chatRoomList }) => {
  return (
    <ChatListStyled>
      {chatRoomList.map((chatRoom) => (
        <ListItem key={chatRoom.crseq} alignItems="flex-start" button onClick={() => onSelectChat(chatRoom.crseq)}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={chatRoom.lastMessage}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chatRoom.lastSendTime}
                </Typography>
                <Badge badgeContent={chatRoom.unreadCount} color="secondary" sx={{ ml: 2 }} />
              </>
            }
          />
        </ListItem>
      ))}
    </ChatListStyled>
  );
};

export default ChatList;
