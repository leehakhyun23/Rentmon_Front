import React from 'react'
import { Link } from 'react-router-dom'

function MypageIconButton({imglink, text, goLink}) {
  return (
    <div className='icon'>
        <Link to={goLink}>
            <img src={"/img/"+imglink} alt="imglink"/>
            <p>{text.split(" ")[0]}</p>
            {(text.split(" ")[1])&&(<p>{text.split(" ")[1]}</p>)}
        </Link>
    </div>
  )
}

export default MypageIconButton
