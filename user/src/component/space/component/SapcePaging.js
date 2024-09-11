import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function SapcePaging({page ,SapcePaging}) {
    const [pagerow , setPageRow] = useState([]);
    useEffect(()=>{
        setPageRow([]);
       
        for(let i =page.firstnum; i<= page.lastnum; i++){
            setPageRow(prev=>[...prev, i]);
        }
    },[page])
  return (
      <div className="pagenation-container">
		{(page.prev == true) &&(<div className="prevBtn cursor" onClick={()=>{SapcePaging(page.firstnum-1)}}><img src='/img/pageArrow.svg'/></div>) }
		<div className="pagenation-wrapper">
           {   pagerow.map((elem, key)=>{
                    if(page.currentPage === elem) return <span  key={"page"+key}>{elem}</span>
                    return  <div  key={"page"+key}><div className='cursor' onClick={()=>{SapcePaging(elem)}} >{elem}</div></div>
               })
            }
		</div>
		{(page.next == true) &&(<div  className="nextBtn cursor"  onClick={()=>{SapcePaging(page.lastnum+1)}} ><img src='/img/pageArrow.svg'/></div>)}
		
	</div>
  )
}

export default SapcePaging
