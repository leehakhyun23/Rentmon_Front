import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import jaxios from '../../../util/jwtUtil';

function Bank({bank, setBank}) {
    const [banckList, setBankList] = useState([]);
    const [isopne, setIsopen] = useState(false);
    useEffect(()=>{
        getBankList();
    },[]);
    useEffect(()=>{
        console.log(bank);
        if(bank) setBank(bank);
        else setBank(banckList[0]);
    },[banckList]);
    let getBankList=async()=>{
        try{
            let result = await jaxios.get("/api/bank/bankList");
            setBankList(result.data);
        }catch(err){console.error(err);}
    }
    const clickbank=(elem)=>{
        setBank(elem);
    }
  return (
    <>
      <div className='bank'>
        <span>은행 선택</span>
        <div className='bankSelect'>
            <span onClick={()=>{setIsopen(prev=> !prev)}}>{(bank)&&bank.bank} <IoIosArrowDown style={(isopne)&&({transform:"rotate(180deg)"})} /></span>
            {(isopne)&&(
                <ul>
                    {banckList.map((elem, key)=>(
                        <li key={key} value={elem.bnum} onClick={()=>{clickbank(elem); setIsopen(false);}} className={(bank && elem.bnum == bank.bnum)&&"select"}>
                            {elem.bank}
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    </>
  )
}

export default Bank
