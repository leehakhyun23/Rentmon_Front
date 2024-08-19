import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { menucountAction } from '../../../store/RecentSlice';
import jaxios from '../../../util/jwtUtil';


function ZzimComponent({record}) {
    const [remove, setremove] = useState(true);
    const dispatch=useDispatch();
    const zzimnone = async(n)=>{
        try{
            let result = await jaxios.post("/api/zzim/zzimActiveno",null,{params:{zseq:n}});
            if(result.data === "ok"){
                setremove(false);
                let result2 = await jaxios.get("/api/user/menucountarray" ,{params:{userid:record.user.userid}});
                dispatch(menucountAction({menucount:result2.data}));
            }
        }catch(err){ console.error(err);}
    }    
    return (
        (remove)&&(
            <div className='zzimcomp'>
                <div className='imgcontainer'> <Link to="">{(record.space.spaceimage.length>0)&&(<img src={`http://localhost:8070/space_images/${record.space.spaceimage[0].realName}`}/>)}</Link></div>
                <div className='content'>
                    <div className='title'>
                        <span>{record.space.title}</span>
                        <FaHeart onClick={()=>{zzimnone(record.zseq)}} />
                    </div>
                    <span>{record.space.subtitle}</span>
                    <div className='hashtag'>
                        <span>#어쩌고 #저쩌고</span>
                    </div>
                </div>
            </div>
        )
    )
}

export default ZzimComponent
