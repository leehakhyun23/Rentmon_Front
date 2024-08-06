import React from 'react'
import { useNavigate } from 'react-router-dom'
import Iconbutton from './component/Iconbutton'
import ListIconButton from './component/ListIconButton';
import SearchInputClick from './component/SearchInputClick';
import "./css/headerfooter.css";

function Header() {
const navigate = useNavigate();
  return (
    <div className='header'>
        <div className='innerContainer'>
            <div className='mo'><Iconbutton src={"/img/searchIconblack.svg"} click={()=>{navigate("/")}}/></div>
            <div className='logo' onClick={()=>{navigate("/")}}><h2>RENTMON</h2></div>
            <div className='left'>
                <div>
                    <div className='pc'><SearchInputClick /></div>
                    <Iconbutton src={"/img/peopleIcon.svg"} click={()=>{navigate("/")}} />
                    <ListIconButton click={()=>{navigate("/")}}  listcount={2}/>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Header
