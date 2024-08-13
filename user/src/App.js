import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import { Choosecategory, Getsnsuserinfo, JoinForm, Login } from './component/member';
import { Main } from './component/main';
import Header from './component/headerfooter/Header';
import Footer from './component/headerfooter/Footer';
import SpaceList from './component/space/SpaceList';
import SpaceDetail from './component/space/SpaceDetail';
import { Coupon, DashBoard, Mypage } from './component/mypage';



import ReservationForm from './component/reservation/ReservationForm';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Main/>} />
      <Route path='/spaceList' element={<SpaceList />} />
      <Route path='/spaceDetail/:sseq' element={<SpaceDetail />} />
      <Route path='/getsnsuserinfo/:userid/:provider' element={<Getsnsuserinfo/>}/>
      <Route path='/join' element={<JoinForm />} />
      <Route path='/choosecategory/:userid' element={<Choosecategory />} />
      <Route path='/reservationForm/:sseq' element={<ReservationForm />} />
      <Route path='/mypage' element={<Mypage />}>
        <Route path='dashboard' element={<DashBoard/>}/>
        <Route path='coupon' element={<Coupon/>}/>
      </Route>
    </Routes>
    <Footer />

    </>
  );
}

export default App;
