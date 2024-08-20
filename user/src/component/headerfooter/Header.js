import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import jaxios from '../../util/jwtUtil';
import Iconbutton from './component/Iconbutton'
import ListIconButton from './component/ListIconButton';
import MypageSidebar from './component/MypageSidebar';
import SearchInputClick from './component/SearchInputClick';
import "./css/headerfooter.css";
import Searchpopup from './Searchpopup';

function Header() {
const navigate = useNavigate();
const user =useSelector(state=>state.user);

// 서치열기
const [searchshow, setSearchshow] = useState({display:"none"});
const [searchPopup , setSearchPopup] = useState(false);
const [searchWord,setSearchWord] =useState('');
const [listcount, setListcount] =useState(0);
const recent = useSelector(state=>state.recent);
const menucount = recent.menucount;
useEffect(()=>{
    if(!searchPopup) setSearchshow({display:"none"});
    else setSearchshow({display:"block"});
},[searchPopup]);

//마이페이지 열기
const [mypageShow, setMypageShow] = useState({right:"-100%"});
const [mypagePopup , setMypagePopup] = useState(false);
const [mypageBlack , setMypageBlack] =useState({display:"none"});

useEffect(()=>{
    setListcount(menucount.reservCount);
},[recent]);


useEffect(()=>{
    if(!mypagePopup){
        setMypageShow({right:"-100%"});
        setMypageBlack({display:"none"});
    }else{
        setMypageShow({right:"0%"});
        setMypageBlack({display:"block"});
    }
},[mypagePopup]);
  return (
    <>
        <div className='header'>
            <div className='innerContainer'>
                <div className='mo'><Iconbutton src={"/img/searchIconblack.svg"} click={()=>{setSearchPopup(true)}}/></div>
                <div className='logo' onClick={()=>{navigate("/")}}><h2>RENTMON</h2></div>
                <div className='left'>
                    <div>
                        <div className='pc'>{(searchPopup)?(null):<SearchInputClick searchWord={searchWord} setSearchPopup={setSearchPopup} />}</div>
                        <Iconbutton src={"/img/peopleIcon.svg"} click={()=>{setMypagePopup(true)}} />
                        {(user.name)&&(<ListIconButton click={()=>{navigate("/mypage/reservation/1")}}  listcount={listcount}/>)}
                    </div>
                </div>
            </div>
        </div>
        {/* 서치팝업 창 */}
        <Searchpopup searchshow={searchshow} searchWord={searchWord} setSearchWord={setSearchWord} setSearchPopup={setSearchPopup} />
        {/* 마이페이지 사이드바메뉴 */}
        <MypageSidebar  loginOn ={(user.name)?(true):(false)} mypageShow={mypageShow} setMypagePopup={setMypagePopup} mypageBlack={mypageBlack}/>
    </>

  )
}

export default Header
