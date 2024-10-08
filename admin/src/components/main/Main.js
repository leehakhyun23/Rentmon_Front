import React from 'react';
import { styled } from '@mui/material/styles';
import FloatingActionButton from '../chat/FloatingActionButton';

const drawerWidth = 240;

const MainStyled = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  backgroundColor: theme.palette.grey[100],
  height: '100%',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = ({ open, children }) => {
  const handleFabClick = () => {
    
  };

  return (
    <MainStyled open={open}>
      <DrawerHeader />
      {children}
      <FloatingActionButton badgeContent={5} onClick={handleFabClick} />
    </MainStyled>
  );
};

export default Main;
