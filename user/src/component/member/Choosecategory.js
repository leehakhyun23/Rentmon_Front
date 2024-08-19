import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelector from './component/CategorySelector';
import CongratulationJoin from './component/CongratulationJoin';
import StationSelector from './component/StationSelector';
import "./css/choosecategory.css";

function Choosecategory() {
    const {userid} = useParams();
    const [btnactive , setBtnActive] = useState(true); 
    const [joindata , setJoindata] = useState({
        station:"",
        category:[],
    }); 
    const navigate = useNavigate();
useEffect(()=>{
    window.scrollTo({ top: 0 });
},[])
    useEffect(()=>{
        setBtnActive(true);
        if(joindata["station"] ==="") setBtnActive(false);
        if(joindata["category"].length < 3) setBtnActive(false);
        
    },[joindata]);

    let gocateClick = async()=>{
        try{
            let result = await axios.post("/api/user/join/categoryset",{station:joindata.station, category:joindata.category , userid});
            alert("회원가입이 완료되었습니다. 로그인 해주세요!");
            navigate("/login");
        }catch(err){
            console.error(err);
        }

    }

  return (
    <div className='innerContainer choosejoinContainer'>
        <div className='choosejoin'>
            <CongratulationJoin/>
            <StationSelector setJoindata ={setJoindata} />
            <CategorySelector setJoindata={setJoindata}/>
            <div className='buttonContainer'>
                <button className={(btnactive)?("active"):null} onClick={gocateClick}>선택 완료</button>
            </div>
        </div>
    </div>
  )
}

export default Choosecategory
