import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CategorySpace from './componenet/CategorySpace';
import MainSlide from './componenet/MainSlide';
import RecommandSpace from './componenet/RecommandSpace';
import "./css/main.css"

function Main() {
  let user = useSelector(state=>state.user);
 
  return (
    <div className='main innerContainer'>
      <MainSlide/>
      <RecommandSpace user={user} />
      <CategorySpace />
    </div>
  )
}

export default Main
