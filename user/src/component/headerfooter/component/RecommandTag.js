import React from 'react'
import { Link } from 'react-router-dom'

function RecommandTag({text , recentseqrchClick}) {
  return (
      <div onClick={()=>{recentseqrchClick(text)}}>{text}</div>
  )
}

export default RecommandTag
