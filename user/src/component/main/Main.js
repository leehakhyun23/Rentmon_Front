import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Main() {
  let user = useSelector(state=>state.user);
  useEffect(()=>{
    console.log(user);
  },[]);
  return (
    <div>
      
    </div>
  )
}

export default Main
