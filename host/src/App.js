import { Routes, Route } from "react-router-dom";

import './App.css';
import Post_cate from './Component/space/Post_cate'
import Post_basicInfo from './Component/space/Post_basicInfo'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="Post_cate" element={<Post_cate />} />
        <Route path="Post_basicInfo" element={<Post_basicInfo />} />
      </Routes>
    </div>
  );
}

export default App;
