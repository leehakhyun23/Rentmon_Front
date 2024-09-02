import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MypageIconButton from '../../headerfooter/component/MypageIconButton'


function InfoDashBoard({user, menucount}) {
  const navigate = useNavigate();
  function gradeimg(n){
    if(n===1)return "bronze.png"
    if(n===2)return "silver.png"
    if(n===3)return "gold.png"
    if(n===4)return "platinum.png"
    if(n===5)return "diamond.png"
  }
  return (
    <div className='infoDashBoard'>
      <div className='container'>
        <div className='left'>
        <div className='userinfo'>
          <div className='profileImg'>
            {(user.profileimg)?(<img src={`http://rentmon-jb.s3.ap-northeast-2.amazonaws.com/profile_images/${user.profileimg}`} alt={user.profileimg}/>):<img src='/img/no_profileimg.png' alt='no_profileimg.png'/>}
            
          </div>
          <div className='textbox'>
            <Link to="/mypage/dashboard">
            <div className='text'>{user.name}<img src={'/img/'+gradeimg(user.gnum.gnum)} alt='bronze.png'/></div>
            <div className='email'>{user.email}</div>
            <div className='phone'>{user.phone}</div>
            </Link>
          </div>
        </div>
          <p onClick={()=>{navigate("/mypage/updateuser");}}>정보수정하기  &gt;</p>
        </div>
        <div className='right'>
          <div className='mypagemenu'>
            <MypageIconButton imglink = {"dashboardIcon.svg"}  text = {`데시보드`} goLink={"/mypage/dashboard"}/>
            <MypageIconButton imglink = {"couponicon2.svg"}  text = {`쿠폰(${menucount.couponCount})`} goLink={"/mypage/coupon/1"}/>
            <MypageIconButton imglink = {"calendaricon2.svg"}  text = {`예약(${menucount.reservCount})`} goLink={"/mypage/reservation/1"}/>
            <MypageIconButton imglink = {"boxicon2.svg"}  text = {`이용한 공간(${menucount.usesapceCount})`}  goLink={"/mypage/usesapce/1"}/>
            <MypageIconButton imglink = {"hearticon2.svg"}  text = {`찜(${menucount.zzimCount})`}  goLink={"/mypage/zzim"}/>
            <MypageIconButton imglink = {"chaticon2.svg"}  text = {`문의(${menucount.inquiryCount})`}  goLink={"/mypage/qna/1"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoDashBoard
