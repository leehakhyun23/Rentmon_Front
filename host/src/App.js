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
        <Route index element={<Main />} />
        <Route path="Post_cate" element={<Post_cate />} />
        <Route path="Post_basicInfo" element={<Post_basicInfo />} />
        <Route path="Post_facility" element={<Post_facility />} />
        <Route path="Post_payment" element={<Post_payment />} />
        <Route path="Post_useInfo" element={<Post_useInfo />} />
        <Route path="ReservationManage" element={<ReservationManage />} />
        <Route path="ReviewManage" element={<ReviewManage />} />
        <Route path="SpaceCorrection" element={<SpaceCorrection />} />
        <Route path="SpaceManage" element={<SpaceManage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Submenu" element={<Submenu />} />
        <Route path="/LoginOn" element={<LoginOn />} />
        <Route path="/ReviewManage" element={<ReviewManage />} />
        <Route path="/LogoutButton" element={<LogoutButton />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/getsnshostinfo/:hostid/:provider" element={<Getsnshostinfo />} />
        <Route path="Col_basicInfo" element={<Col_basicInfo />} />
        <Route path="Col_facility" element={<Col_facility />} />
        <Route path="Col_useInfo" element={<Col_useInfo />} />
        

      </Routes>
  );
}

export default App;
