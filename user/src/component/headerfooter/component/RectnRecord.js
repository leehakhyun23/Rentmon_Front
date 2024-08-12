import React from 'react'
import { Link } from 'react-router-dom'

function RectnRecord({text, url, deleterecord}) {
  return (
    <div className='record'>
        <div>
            <img src='/img/searchIcon.svg' alt='searchIcon'/>
            <Link to={url}>{text}</Link>
        </div>
        <span onClick={deleterecord} className='deleterecord'></span>
    </div>
  )
}

export default RectnRecord
