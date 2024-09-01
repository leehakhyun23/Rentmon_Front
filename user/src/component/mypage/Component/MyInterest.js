import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MyInterestModal from './MyInterestModal';

function MyInterest({user ,updateUser}) {
    const [category ,setCategory] = useState([]);
    const [isopen, setIsopen] = useState(false);
    useEffect(()=>{
        getCategoryarr();
    },[]);

    let getCategoryarr = async()=>{
        try{
            let result = await axios.get("/api/user/getCategoryList");
            setCategory(result.data);
        }catch(err){console.error(err);}
    }
    let filter=(num)=>{
      return  category.map((elem,key)=> {
            if(elem.cnum == num) return elem.name
        })
    }
  return (
    <>
        <div className='myinterest'>
            <div className='top'>
                <h1>내 관심 정보</h1>
                <button onClick={()=>{setIsopen(true)}}>변경</button>
            </div>
            <div className='station'>
                <p>관심지역</p>
                {(user.station)?(<span className='tag'>{user.station}</span>):(<div className='notext'>등록된 관심지역이 없습니다.</div>)}
            </div>
            <div className='minterest'>
                <p>관심사</p>
                <div>
                {(user.category1)&&(<span className='tag'>{filter(user.category1)}</span>)}
                {(user.category2)&&(<span className='tag'>{filter(user.category2)}</span>)}
                {(user.category3)&&(<span className='tag'>{filter(user.category3)}</span>)}
                {(!user.category1)&&(<div className='notext'>등록된 관심사가 없습니다.</div>)}
                </div>
            </div>
        </div>
        <MyInterestModal category={category} user={user} isopen={isopen} setIsopen={setIsopen} updateUser={updateUser}/>
    </>
  )
}

export default MyInterest
