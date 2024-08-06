import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './component/member';
import { Main } from './component/main';
import Header from './component/headerfooter/Header';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Main/>} />
    </Routes>
    </>
  );
}

export default App;
