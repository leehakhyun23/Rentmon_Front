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

      </Routes>
  );
}

export default App;
