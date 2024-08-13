import { Routes, Route } from "react-router-dom";

import './App.css';
import Post_cate from './Component/space/Post_cate'
import Post_basicInfo from './Component/space/Post_basicInfo'
import Login from './Component/member/Login'
import Join from './Component/member/Join'
import React from 'react';
import Main from "./Component/Main";
import Getsnshostinfo from "./Component/member/Getsnshostinfo";

function App() {
  return (
      
      <Routes>
        <Route index element={<Main />} />
        <Route path="Post_cate" element={<Post_cate />} />
        <Route path="Post_basicInfo" element={<Post_basicInfo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/getsnshostinfo/:hostid" element={<Getsnshostinfo />} />
        
      </Routes>
  );
}

export default App;
