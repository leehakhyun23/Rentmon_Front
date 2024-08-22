import React from 'react'
import { Link } from 'react-router-dom'

function RectnRecord({text, recentseqrchClick, deleterecord}) {
  return (
    <div className='record'>
        <div>
            <img src='/img/searchIcon.svg' alt='searchIcon'/>
            <div onClick={()=>{recentseqrchClick(text)}}>{text}</div>
        </div>
        <span onClick={deleterecord} className='deleterecord'></span>
    </div>
  )
}

export default RectnRecord
