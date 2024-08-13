import React, { useEffect, useState } from 'react'

function CategorySelector({setJoindata}) {
    const partyroom = ["파티룸","연습실","촬영 스튜디오","스터디룸","공연장","라이브방송","세미나실","악기연습실","운동시설","갤러리","캠핑"];
    const [categorycount, setCategorycount] = useState(0);
    
    useEffect(()=>{
        let checkboxs = document.querySelectorAll(".category-tag-container li");
        document.querySelector(".category-tag-container").addEventListener("click",()=>{checkedlabel(checkboxs)});
    },[]);

    function checkedlabel(checkboxs){
        let checkedSelects = document.querySelectorAll(".category-tag-container input:checked").length;
        let array = [];
        checkboxs.forEach((elem, index)=>{
           if(checkedSelects >= 3) unchecked(elem, true);
           else unchecked(elem, false);
           if(elem.querySelector("input").checked){
            elem.classList.add("selected");
            array.push(index+1);
            setJoindata(prev=>({...prev,category:array}))
           }else elem.classList.remove("selected");
        });
        setCategorycount(checkedSelects);
    }

    function unchecked(checkbox, able){
        if(!checkbox.querySelector("input").checked) checkbox.querySelector("input").disabled = able;
        if(able) checkbox.classList.add("disabled");
        else checkbox.classList.remove("disabled");
    }


  return (
    <div className='category commonselectcontainer'>
      <h1>카테고리<small style={{fontSize:"0.6em"}}>({categorycount})</small></h1>
    <div className='category-tag-container'>
        <ul>
            {partyroom.map((item, key)=>(
                <li key={key} className={`station-tag`} value={item}>
                    <label htmlFor={item}>{item}<input type="checkbox" name='category' value= {item} id={item}/></label>
                </li>
            ))}
        </ul>
    </div>
    </div>
  )
}

export default CategorySelector
