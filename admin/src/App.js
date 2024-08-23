import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import MainRoutes from './template/MainRoutes';
import { useState } from 'react';
import CustomAppBar from './template/AppBar';
import CustomDrawer from './template/Drawer';

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <Routes>
          {MainRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Main>
    </div>
  );
}

export default App;
