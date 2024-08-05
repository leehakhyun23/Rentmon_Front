import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './component/member';
import { Main } from './component/main';

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/main' element={<Main/>} />
    </Routes>
    </>
  );
}

export default App;
