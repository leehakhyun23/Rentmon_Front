import React, { useCallback, useEffect, useState } from 'react'

function MyCategorySelector({isopen , category,user,setInterest ,interset}) {
    const [categorycount, setCategorycount] = useState(0);

    useEffect(()=>{
        let checkboxs = document.querySelectorAll(".category-tag-container li");
        document.querySelector(".category-tag-container").addEventListener("click",()=>{checkedlabel(checkboxs)});
    },[category])

    useEffect(()=>{
        for(let i of interset.category){
            if(document.querySelector(`.category-tag-container li input[value= "${i}"]`))document.querySelector(`.category-tag-container li input[value= "${i}"]`).click();
        }
    },[category , isopen]);

    let checkedlabel = useCallback((checkboxs)=>{
        let checkedSelects = document.querySelectorAll(".category-tag-container input:checked").length;
        let array = [];
        checkboxs.forEach((elem, index)=>{
           if(checkedSelects >= 3) unchecked(elem, true);
           else unchecked(elem, false);
           if(elem.querySelector("input").checked){
            elem.classList.add("selected");
            array.push(index+1);
            setInterest(prev=>({...prev,category:array}))
           }else elem.classList.remove("selected");
        });
        setCategorycount(checkedSelects);
        if(checkedSelects ===0)setInterest(prev=>({...prev,category:[]}));
    },[category , isopen]);
    

    let unchecked=useCallback((checkbox, able)=>{
        if(!checkbox.querySelector("input").checked) checkbox.querySelector("input").disabled = able;
        if(able) checkbox.classList.add("disabled");
        else checkbox.classList.remove("disabled");
    },[category]);
  return (
    <div className='category commonselectcontainer'>
      <h1>카테고리<small style={{fontSize:"0.6em"}}>({categorycount})</small></h1>
    <div className='category-tag-container'>
        <ul>
            {category.map((item, key)=>(
                <li key={key} className={`station-tag`} value={item.name}>
                    <label htmlFor={item.name}>{item.name}<input type="checkbox" name='category' value= {item.cnum} id={item.name}/></label>
                </li>
            ))}
        </ul>
    </div>
    </div>
  )
}

export default MyCategorySelector
