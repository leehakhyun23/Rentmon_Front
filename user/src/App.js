import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './component/member';
import { Main } from './component/main';
import Header from './component/headerfooter/Header';
import Footer from './component/headerfooter/Footer';
import SpaceList from './component/space/SpaceList';
import SpaceDetail from './component/space/SpaceDetail';
import Getsnsuserinfo from './component/member/Getsnsuserinfo';


function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Main/>} />
      <Route path='/spaceList' element={<SpaceList />} />
      <Route path='/spaceDetail/:sseq' element={<SpaceDetail />} />
      <Route path='/getsnsuserinfo/:userid' element={<Getsnsuserinfo/>}/>
    </Routes>
    <Footer />
    </>
  );
}

export default App;
