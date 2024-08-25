import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './components/main/Main';
import { loginRoute, MainRoutes } from './template/MainRoutes';
import { useState } from 'react';
import CustomAppBar from './template/AppBar';
import CustomDrawer from './template/Drawer';

function App() {
  const [open, setOpen] = useState(false);
  const adminName = "Admin";
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isLoginPage = location.pathname === `/${loginRoute.path}`;

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && (
        <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} adminName={adminName} />
      )}
      {!isLoginPage && <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />}
      <Main open={open} isLoginPage={isLoginPage}>
        <Routes>
          <Route path={loginRoute.path} element={loginRoute.element} />
          {MainRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Main>
    </div>
  );
}

export default App;
