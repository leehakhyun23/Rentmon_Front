import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-modal';
import jaxios from '../../../util/jwtUtil';

function UdateFormLeft({user,updateUser}) {
  const [profileimg, setProfileimg]= useState({profileimg:""});
  const [isSubmit , setIsSubmit] = useState(false);
  const [isopen, setIsopen] = useState(false);
  Modal.setAppElement('#root');

  const [img, setImg] = useState("/img/no_profileimg.png");

  useEffect(()=>{
    if(user.profileimg) setImg(`http://localhost:8070/profile_images/${user.profileimg}`);
  },[user]);

  useEffect(()=>{
    if(!user.profileimg) setImg("/img/no_profileimg.png");
  },[isopen])

  const imgClick=()=>{
    document.querySelector("input[name='image']").click();
    
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      }
      reader.readAsDataURL(file);
      setProfileimg(prev=>( {profileimg:file}));
    }
    setIsSubmit(true);
  }

  const removeImage = () => {
    setImg("/img/no_profileimg.png");
    document.querySelector("input[name='image']").value = ""; 
    setProfileimg({profileimg: ""});
    setIsSubmit(true);
  }

  const onSubmit= async()=>{
    if(!isSubmit) return alert("프로필 이미지를 변경 후 버튼을 눌러주세요.");
    try{
      let formData = new FormData();
      formData.append("userid", user.userid);
      formData.append("profileimg", profileimg.profileimg);
      let result = await jaxios.post("/api/user/changeProfile", formData);
      if(result.data === "ok"){
        closepu();
        updateUser();
      }
    }catch(err){
      console.log(err);
    }
  }

  const closepu = ()=>{
    if(user.profileimg)setImg(`http://localhost:8070/profile_images/${user.profileimg}`);
    else {
      removeImage();
    }
    setIsSubmit(false);
    setIsopen(false);
  }

  return (
    <>
        <div className='profileImg'>
            {(user.profileimg)?(<img src={`http://localhost:8070/profile_images/${user.profileimg}`} alt={user.profileimg}/>):<img src='/img/no_profileimg.png' alt='no_profileimg.png'/>}
        </div>
        <div className='leftInfo'>
            <button onClick={()=>{setIsopen(true)}}>프로필 사진 변경</button>
            <p>rmfoal1996@naver.com</p>
        </div>
       <Modal  isOpen={isopen} onRequestClose={()=>{setIsopen(false); closepu()}}> 
        <div className='profileImage'>
              <p>프로필 사진 등록</p>
              <div className='imgContainer'>
                  <div className='img_input'>
                      <img src={img} alt='profileimg'/>
                      <input style={{display:"none"}} type="file" name='image' onChange={(e)=>{handleImageChange(e)}}/>
                      <div className='buttonContainer'>
                          <button onClick={imgClick}>사진 올리기</button>
                          <button onClick={removeImage}>사진 지우기</button>
                      </div>
                  </div>
                  <div className='buttonWrap'>
                    <button onClick={onSubmit}>수정하기</button>
                    <button onClick={()=>{
                      setIsopen(false); 
                      closepu();
                      }}>닫기</button>
                  </div>
              </div>
          </div>
        </Modal> 
    </>
  )
}

export default UdateFormLeft
