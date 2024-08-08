import React from 'react'
import { Link } from 'react-router-dom'

function RecommandTag({text , url}) {
  return (
      <Link to={url}>{text}</Link>
  )
}

export default RecommandTag
