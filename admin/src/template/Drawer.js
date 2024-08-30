import React, { useState } from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemText, Divider, IconButton, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
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
  const [openSubMenu, setOpenSubMenu] = useState({});

  const handleSubMenuClick = (id) => {
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [id]: !prevOpenSubMenu[id],
    }));
  };

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
          <React.Fragment key={menuItem.id}>
            {menuItem.type === "collapse" ? (
              <>
                <ListItem button onClick={() => handleSubMenuClick(menuItem.id)}>
                  <menuItem.icon />
                  <ListItemText primary={menuItem.title} sx={{ ml: 1 }} />
                  {openSubMenu[menuItem.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSubMenu[menuItem.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.children.map(subMenuItem => (
                      <ListItem
                        button
                        key={subMenuItem.id}
                        component={Link}
                        to={subMenuItem.url}
                        sx={{ pl: 4 }}
                      >
                        <subMenuItem.icon />
                        <ListItemText primary={subMenuItem.title} sx={{ ml: 1 }} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem button component={Link} to={menuItem.url}>
                <menuItem.icon />
                <ListItemText primary={menuItem.title} sx={{ ml: 1 }} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default CustomDrawer;
