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
		{(page.prev == true) &&(<Link className="prevBtn" onClick={()=>{SapcePaging(page.firstnum-1)}}><img src='/img/pageArrow.svg'/></Link>) }
		<div className="pagenation-wrapper">
           {   pagerow.map((elem, key)=>{
                    if(page.currentPage === elem) return <span  key={"page"+key}>{elem}</span>
                    return  <div  key={"page"+key}><Link onClick={()=>{SapcePaging(elem)}} >{elem}</Link></div>
               })
            }
		</div>
		{(page.next == true) &&(<Link  className="nextBtn"  onClick={()=>{SapcePaging(page.lastnum+1)}} ><img src='/img/pageArrow.svg'/></Link>)}
		
	</div>
  )
}

export default SapcePaging
