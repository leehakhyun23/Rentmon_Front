import React from 'react'

function Iconbutton({ src, click }) {
    
  return (
    <div className='iconbutton'>
        <div onClick={click} ><img src={src} alt={src} /></div>
    </div>
  )
}

export default Iconbutton
