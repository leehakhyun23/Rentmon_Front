import React from 'react'

function SpaceComponent({record}) {
  return (
    <div className='SpaceComponent'>
        <div className='imgcontainer'><Link to="">{(record.space.spaceimage.length>0)&&(<img src={`http://localhost:8070/space_images/${record.space.spaceimage[0].realName}`}/>)}</Link></div>
        <div className='content'>
            <div className='title'>
                <span>{record.space.title}</span>
                <FaHeart onClick={()=>{zzimnone(record.zseq)}} />
            </div>
            <span>{record.space.subtitle}</span>
            <div className='hashtag'>
                <span>#어쩌고 #저쩌고</span>
            </div>
        </div>
    </div>
  )
}

export default SpaceComponent
