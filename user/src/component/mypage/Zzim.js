import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import jaxios from '../../util/jwtUtil';
import ZzimComponent from './Component/ZzimComponent'

function Zzim() {
    const [zzim,setZzim] = useState([]);
    const user = useSelector(state=>state.user);
    let recent =useSelector(state => state.recent);
    const observbox = useRef(null);
    const [hasmore ,setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(()=>{setPage(1)},[])
    useEffect(()=>{
        getZzimList(page);
    },[page]);

    useEffect(()=>{
        const observer = new IntersectionObserver(interciption,{
            rootMargin:"0px",
            threshold:1.0
        });
        if(observbox.current) observer.observe(observbox.current);

        return()=>{
            if(observbox.current) observer.unobserve(observbox.current);
        }
    },[hasmore]); 

    const getZzimList = async(page)=>{
        try{
            let result = await jaxios.get("/api/zzim/getZzimList/"+user.userid,{params:{page}});
            console.log(result.data);
            setZzim(prev=>[...prev,...result.data]);
            if(result.data.length == 0) setHasMore(false);
        }catch(err){console.error(err);}
    }
    
    const interciption = (entries)=>{
        if(entries[0].isIntersecting && hasmore) setPage(prev => prev+1);
    }
    

    return (
        <div className='zzimContainer'>
            <h2>찜({recent.menucount.zzimCount})</h2>
            <div className='zzimList'>
                {(zzim.length > 0)&&(
                    zzim.map((elem, idx)=>{
                        return <ZzimComponent key={idx} record={elem}/>
                    })
                )}
            </div>
            <div ref={observbox} style={{height:"10px"}}></div>
        </div>
    )
}

export default Zzim
