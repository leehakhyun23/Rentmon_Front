import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import MyCategorySelector from './MyCategorySelector';
import MyStationSelector from './MyStationSelector';

function MyInterestModal({category, user , isopen , setIsopen , updateUser}) {
  const [btnactive , setBtnActive] = useState(true); 
  const [interset , setInterest] = useState({
    station:user.station,
    category:[user.category1,user.category2,user.category3],
  });
  useEffect(()=>{
    setInterest({
        station:user.station,
        category:[user.category1,user.category2,user.category3],
      });
      if(!user.category1)setInterest(prev=>{return {...prev,category:[] }});
  },[isopen,user]);
  useEffect(()=>{
   
    if(interset["station"] != null && interset["category"].length >= 3) setBtnActive(true);
    else setBtnActive(false);
},[interset]);

let close = ()=>{
    setIsopen(false);
}

  const gocateClick = async()=>{
    try{
        let result = await axios.post("/api/user/join/categoryset",{station:interset.station, category:interset.category , userid:user.userid});
        updateUser();
        setIsopen(false);
    }catch(err){console.error(err)}
  }
  return (
    <Modal isOpen={isopen} onRequestClose={()=>{close()}}>
        <div className='categoryModal'>
            <MyStationSelector isopen={isopen} user={user} setInterest={setInterest} interset={interset} />
            <MyCategorySelector isopen={isopen} category={category} user={user} setInterest={setInterest}  interset={interset} />
            <div className='buttonContainer'>
                <button className={(btnactive)?("active"):null} onClick={gocateClick}>수정하기</button>
                <button className="closeBtn" onClick={close}>닫기</button>
            </div>
        </div>
    </Modal>
  )
}

export default MyInterestModal
