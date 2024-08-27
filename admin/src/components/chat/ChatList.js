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
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  zIndex: 999,
}));

const ChatList = ({ onSelectChat, chatRoomList }) => {
  const chatList = [
    {
      id: 1,
      name: 'Alice',
      profileImage: 'https://example.com/alice.jpg',
      message: 'Hello, how are you?',
      time: '12:30 PM',
      badgeContent: 2,
    },
    {
      id: 2,
      name: 'Bob',
      profileImage: 'https://example.com/bob.jpg',
      message: 'Are you coming to the meeting?',
      time: '11:00 AM',
      badgeContent: 1,
    },
  ];

  return (
    <ChatListStyled>
      {chatList.map((chat) => (
        <ListItem key={chat.id} alignItems="flex-start" button onClick={() => onSelectChat(chat.id)}>
          <ListItemAvatar>
            <Avatar alt={chat.name} src={chat.profileImage} />
          </ListItemAvatar>
          <ListItemText
            primary={chat.message}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.time}
                </Typography>
                <Badge badgeContent={chat.badgeContent} color="secondary" sx={{ ml: 2 }} />
              </>
            }
          />
        </ListItem>
      ))}
    </ChatListStyled>
  );
};

export default ChatList;
