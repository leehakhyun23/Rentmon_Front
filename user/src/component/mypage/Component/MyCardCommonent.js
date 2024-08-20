import React, { useState } from 'react'
import UpdateMyCardModal from './UpdateMyCardModal';

function MyCardCommonent({card , updateUser}) {
    const [isopen, setIsopen] = useState(false);
    function textreplace(text){
        if (typeof text !== 'string') {
            text = String(text);
        }
        return text.replace(/\d/g, (str, index) => {
            return index <= 1 ? str : '*';
        });
    }
  return (
    <div className='cardInfo '>
        <div className='row'>
            <div className='bank'>은행</div>
            <div className='content'>{(card)&&(card.bank.bank)}</div>
        </div>
        <div className='row'>
            <div className='cardnum'>카드 번호</div>
            <div className='content'>{(card)&&(textreplace(card.cardnum))}</div>
        </div>
        <div className='row'>
            <div className='cvc'>cvc</div>
            <div className='content'>{(card)&&(textreplace(card.cvc))}</div>
        </div>
        <div className='row'>
            <div className='monthyear'>유효기간</div>
            <div className='content'>{(card)&&(textreplace(card.monthyear))}</div>
        </div>
        <div className='row button'>
            <button onClick={()=>{setIsopen(true)}}>변경하기</button>
        </div>
        <UpdateMyCardModal isopen={isopen} setIsopen={setIsopen} card={card} updateUser={updateUser}/>
    </div>
  )
}

export default MyCardCommonent
