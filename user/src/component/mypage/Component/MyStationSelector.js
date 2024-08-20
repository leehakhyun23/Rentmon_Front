import React, { useEffect } from 'react'

function MyStationSelector({isopen,user,setInterest , interset}) {
    const array = ["서울","부산","대구","인천","광주","대전","울산","세종","경기","강원","충청도","전북","전라도","경상도","제주"];
    
    let beforeselector ,clickContaienr;
    
    useEffect(()=>{
        if(interset.station){
            beforeselector = document.querySelector(`.station-tag-container li[value= '${interset.station}']`);
        }
        clickContaienr = document.querySelector(".station-tag-container");
        clickContaienr.addEventListener("click",tagclickHandler);
        if(interset.station)beforeselector.querySelector("input").click();
        //데이터 확인
        return ()=>clickContaienr.removeEventListener("click",tagclickHandler);
    },[setInterest]);


    let tagclickHandler = (e)=>{
        if(e.target.nodeName !== "INPUT" ) return false;
        if(beforeselector)beforeselector.classList.remove("selected");
        let currentli = document.querySelector(`li[value= '${e.target.value}']`);
        currentli.classList.add("selected");
        setInterest(prev=>({...prev , station:e.target.value}));
        beforeselector = currentli;
    }
  return (
    <div>
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
    </div>
  )
}

export default MyStationSelector
