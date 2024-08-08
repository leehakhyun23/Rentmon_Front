import React from 'react'
import { Link } from 'react-router-dom'

function MypageIconButton({imglink, text, goLink}) {
  return (
    <div className='icon'>
        <Link to={goLink}>
            <img src={"/img/"+imglink} alt="imglink"/>
            <p>{text}</p>
        </Link>
    </div>
  )
}

export default MypageIconButton
