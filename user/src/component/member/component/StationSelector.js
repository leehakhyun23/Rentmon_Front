import React, { useEffect } from 'react'

function StationSelector({setJoindata}) {
    const array = ["서울","부산","대구","인천","광주","대전","울산","세종","경기도","강원도","충청남도","전북","전라남도","경상북도","제주"];
    
    let beforeselector ,clickContaienr;
    
    useEffect(()=>{
        beforeselector = document.querySelectorAll(".station-tag-container li")[0];
        clickContaienr = document.querySelector(".station-tag-container");
        clickContaienr.addEventListener("click",tagclickHandler);
        beforeselector.querySelector("input").click();
        return ()=>clickContaienr.removeEventListener("click",tagclickHandler);
    },[setJoindata]);


    let tagclickHandler = (e)=>{
        if(e.target.nodeName !== "INPUT" ) return false;
        beforeselector.classList.remove("selected");
        let currentli = document.querySelector(`li[value= '${e.target.value}']`);
        currentli.classList.add("selected");
        setJoindata(prev=>({...prev , station:e.target.value}));
        beforeselector = currentli;
    }
  return (
    <div className='station commonselectcontainer'>
      <h1>지역</h1>
     <div className='station-tag-container'>
        <ul>
            {array.map((item, key)=>(
                <li key={key} className={`station-tag`} value={item}>
                    <label htmlFor={item}>{item}<input type="radio" name='station' value= {item} id={item}/></label>
                </li>
            ))}
        </ul>
     </div>
    </div>
  )
}

export default StationSelector
