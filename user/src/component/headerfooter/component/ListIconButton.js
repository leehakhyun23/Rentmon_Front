import React from 'react'

function ListIconButton({click, listcount}) {
  return (
    <div className='iconbutton'>
        <div onClick={click} >
            <img src="/img/ListIcon.svg" alt="ListIcon.svg" />
            {(listcount>0)?<div className='countbox'>{listcount}</div>:(null)}
        </div>
    </div>
  )
}

export default ListIconButton
