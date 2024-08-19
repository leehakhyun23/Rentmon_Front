import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MainSlide from './componenet/MainSlide';
import RecommandSpace from './componenet/RecommandSpace';
import "./css/main.css"

function Main() {
  let user = useSelector(state=>state.user);
  useEffect(()=>{
    console.log(user);
  },[]);
  return (
    <div className='main innerContainer'>
      <MainSlide/>
      <RecommandSpace user={user} />
    </div>
  )
}

export default Main
