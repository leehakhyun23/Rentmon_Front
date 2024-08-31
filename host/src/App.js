import { Routes, Route } from "react-router-dom";

import './App.css';
import Post_cate from './Component/space/Post_cate'
import Post_basicInfo from './Component/space/Post_basicInfo'
import Post_facility from './Component/space/Post_facility'
import Post_payment from './Component/space/Post_payment'
import Post_useInfo from './Component/space/Post_useInfo'
import ReservationManage from './Component/space/ReservationManage'
import ReviewManage from './Component/space/ReviewManage'
import SpaceCorrection from './Component/space/SpaceCorrection'
import SpaceManage from './Component/space/SpaceManage'
import Login from './Component/member/Login'
import Join from './Component/member/Join'
import React from 'react';
import Main from "./Component/Main";
import Getsnshostinfo from "./Component/member/Getsnshostinfo";
import Update from "./Component/member/Update";
import Submenu from "./Component/member/Submenu";
import Col_basicInfo from "./Component/space/Col_basicInfo";
import Col_facility from "./Component/space/Col_facility";
import Col_useInfo from "./Component/space/Col_useInfo";
import LoginOn from "./Component/member/LoginOn";
import LogoutButton from "./Component/member/LogoutButton";
import Report from "./Component/space/Report";


function App() {
  return (
      
      <Routes>
        <Route index path="/host/main" element={<Main />} />
        <Route path="/host/Post_cate" element={<Post_cate />} />
        <Route path="/host/Post_basicInfo" element={<Post_basicInfo />} />
        <Route path="/host/Post_facility" element={<Post_facility />} />
        <Route path="/host/Post_payment" element={<Post_payment />} />
        <Route path="/host/Post_useInfo" element={<Post_useInfo />} />
        <Route path="/host/ReservationManage" element={<ReservationManage />} />
        <Route path="/host/ReviewManage" element={<ReviewManage />} />
        <Route path="/host/SpaceCorrection" element={<SpaceCorrection />} />
        <Route path="/host/SpaceManage" element={<SpaceManage />} />
        <Route path="/host/Login" element={<Login />} />
        <Route path="/host/Join" element={<Join />} />
        <Route path="/host/Update" element={<Update />} />
        <Route path="/host/Submenu" element={<Submenu />} />
        <Route path="/host/LoginOn" element={<LoginOn />} />
        <Route path="/host/ReviewManage" element={<ReviewManage />} />
        <Route path="/host/LogoutButton" element={<LogoutButton />} />
        <Route path="/host/Report" element={<Report />} />
        <Route path="/host/getsnshostinfo/:hostid/:provider" element={<Getsnshostinfo />} />
        <Route path="/host/Col_basicInfo" element={<Col_basicInfo />} />
        <Route path="/host/Col_facility" element={<Col_facility />} />
        <Route path="/host/Col_useInfo" element={<Col_useInfo />} />
        

      </Routes>
  );
}

export default App;
