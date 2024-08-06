import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './component/member';
import { Main } from './component/main';
import Header from './component/headerfooter/Header';
import SpaceList from './component/space/SpaceList';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Main/>} />

      <Route path='/spaceList' element={<SpaceList />} />
    </Routes>
    </>
  );
}

export default App;
