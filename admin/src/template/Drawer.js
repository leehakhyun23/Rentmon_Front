import React from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MainMenu from './MainMenu';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const CustomDrawer = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MainMenu.children.map(menuItem => (
          <ListItem button key={menuItem.id} component={Link} to={menuItem.url}>
            <menuItem.icon />
            <ListItemText primary={menuItem.title} />
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default CustomDrawer;
