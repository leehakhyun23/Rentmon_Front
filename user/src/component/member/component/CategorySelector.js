import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

function CategorySelector({setJoindata}) {
    const [category, setCategory] = useState([]);
    const [categorycount, setCategorycount] = useState(0);
    
    useEffect(()=>{
        getCategoryarr();
    },[]);
    useEffect(()=>{
        let checkboxs = document.querySelectorAll(".category-tag-container li");
        document.querySelector(".category-tag-container").addEventListener("click",()=>{checkedlabel(checkboxs)});
    },[category])

    let getCategoryarr = async()=>{
        try{
            let result = await axios.get("/api/user/getCategoryList");
            setCategory(result.data);
            
        }catch(err){console.error(err);}
    }

    let checkedlabel = useCallback((checkboxs)=>{
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
    },[category]);

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

export default CategorySelector
