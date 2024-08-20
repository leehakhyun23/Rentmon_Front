import { Routes, Route } from "react-router-dom";

import './App.css';
import Post_cate from './Component/space/Post_cate'
import Post_basicInfo from './Component/space/Post_basicInfo'
import Login from './Component/member/Login'
import Join from './Component/member/Join'
import React from 'react';
import Main from "./Component/Main";
import Getsnshostinfo from "./Component/member/Getsnshostinfo";
import Update from "./Component/member/Update";
import Submenu from "./Component/member/Submenu";

function App() {
  return (
      
      <Routes>
        <Route index element={<Main />} />
        <Route path="Post_cate" element={<Post_cate />} />
        <Route path="Post_basicInfo" element={<Post_basicInfo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Submenu" element={<Submenu />} />
        <Route path="/getsnshostinfo/:hostid/kakao" element={<Getsnshostinfo />} />
        <Route path="/getsnshostinfo/:hostid/naver" element={<Getsnshostinfo />} />
        <Route path="/getsnshostinfo/:hostid/google" element={<Getsnshostinfo />} />

        
      </Routes>
  );
}

export default App;
