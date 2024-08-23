import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux';
import jaxios from '../../../util/jwtUtil';
import Bank from './Bank';
import CardNum from './CardNum';
import Cvc from './Cvc';
import Monthyear from './Monthyear';


function UpdateMyCardModal({isopen , setIsopen , card , updateUser }) {
    let user = useSelector(state=>state.user);
    const [bank, setBank] = useState((user.cseq)&&user.cseq.bank||"");
    const [cardnum , setcardnum] = useState(""); 
    const [cvc,setCvc] = useState(""); 
    const [monthyear,setMonthyear] = useState(""); 
    const [isButton , setIsButton] = useState(false);
    const close = ()=>{
        setIsopen(false);
    }

    useEffect(()=>{
        setIsButton(true);
        if(!cardnum){ setIsButton(false) }
        if(!cvc){ setIsButton(false) }
        if(!monthyear){ setIsButton(false) }
    },[cardnum ,cvc,monthyear]);

    let submit =async()=>{
        try{
            let data = {
                bank,
                cardnum,
                cvc,
                monthyear,
            }
            if(user.cseq) data["cseq"] = user.cseq.cseq;
            let reuslt= await jaxios.post("/api/bank/changeBank",data,{params:{
                userid:user.userid}});
            updateUser();
            setIsopen(false);
        }catch(err){console.error(err);}
    }
  return (
    <Modal isOpen={isopen} onRequestClose={()=>{close()}}>
         <div className='cardwrap'>
            <div className='cardModalCon'>
                <h2>카드 키 수정</h2>
                <Bank bank={bank} setBank={setBank} />
                <CardNum cardnum={cardnum} setcardnum={setcardnum}/>
                <Cvc cvc={cvc} setCvc={setCvc} />
                <Monthyear monthyear={monthyear} setMonthyear={setMonthyear} />

            </div>
            <div className='buttonContainer'>
                <button className={(isButton)&&("active")} onClick={submit}>수정</button>
                <button className='closeBtn' onClick={()=>{close()}}>닫기</button>
            </div>
         </div>
    </Modal>
  )
}

export default UpdateMyCardModal
