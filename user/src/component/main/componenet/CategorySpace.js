import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SpaceBoxComponent from './SpaceBoxComponent';

function CategorySpace() {
    const [category, setCategory] = useState([]);
    const [list, setList] = useState([]);
    const [cnum , setCnum] = useState(0);
    useEffect(()=>{
        getCategoryarr();
    },[]);

    useEffect(()=>{
        getList();
    },[cnum]);

    let getList= async()=>{
        try{
            let result = await axios.get("/api/main/getSapceList",{params:{cnum}});
            setList(result.data);
            
        }catch(err){console.error(err);}
    }

    let getCategoryarr = async()=>{
        try{
            let result = await axios.get("/api/user/getCategoryList");
            setCategory(result.data);
            
        }catch(err){console.error(err);}
    }
  return (
    <div className='categorySelect'>
        <div className='title'>
            <h1>카테고리별 검색</h1>
        </div>
        <div className='categoryTagWrap'>
            <span className={(cnum === 0)&&("active")} onClick={()=>{setCnum(0)}}>전체</span>
            {category.map((elem, idx)=>{return <span key={idx} className={(cnum === elem.cnum)?("active"):""} onClick={()=>{setCnum(elem.cnum)}}>{elem.name}</span>})}
        </div>
        <div className='categoryList'>
            {((list)&&(list.map((elem , key)=>(
                <SpaceBoxComponent  key={key} record={elem} />
            ))))}
        </div>
        <div className='moreSpace'><Link to={"/spaceList"}>공간 더보기</Link></div>
    </div>
  )
}

export default CategorySpace
