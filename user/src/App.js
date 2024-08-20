import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import { Choosecategory, Getsnsuserinfo, JoinForm, Login } from './component/member';
import { Main } from './component/main';
import Header from './component/headerfooter/Header';
import Footer from './component/headerfooter/Footer';
import SpaceList from './component/space/SpaceList';
import SpaceDetail from './component/space/SpaceDetail';
import { Coupon, DashBoard, Mypage, Reservation } from './component/mypage';

import ReservationForm from './component/reservation/ReservationForm';
import ReservationDone from './component/reservation/ReservationDone';

import Usesapce from './component/mypage/Usesapce';
import Zzim from './component/mypage/Zzim';
import Qna from './component/mypage/Qna';
import Updateuser from './component/mypage/Updateuser';
import InsertInquiry from './component/inquiry/InsertInquiry';

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
      <Route path='/reservationDone/:sseq' element={<ReservationDone />} />

      <Route path='/mypage' element={<Mypage />}>
        <Route path='dashboard' element={<DashBoard/>}/>
        <Route path='coupon/:currentPage' element={<Coupon/>}/>
        <Route path='reservation/:currentPage' element={<Reservation/>}/>
        <Route path='usesapce/:currentPage' element={<Usesapce/>} />
        <Route path='zzim' element={<Zzim/>} />
        <Route path='qna/:currentPage' element={<Qna/>} />
        <Route path='updateuser' element={<Updateuser/>} />
      </Route>
      <Route path='/insertInquiry/:scseq' element={<InsertInquiry />}/>
    </Routes>
    <Footer />

    </>
  );
}

export default App;
