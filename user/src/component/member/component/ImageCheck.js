import React, { useState } from 'react'

function ImageCheck({setInfo}) {
  const [img, setImg] = useState("/img/no_profileimg.png");

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
      setInfo(prev=>({...prev, profileimg:file}));
    }
  }

  const removeImage = () => {
    setImg("/img/no_profileimg.png"); // 기본 이미지로 되돌리기
    document.querySelector("input[name='image']").value = ""; // 파일 입력 초기화
  }
  return (
    <div className='profileImage'>
        <p>프로필 사진 등록</p>
        <div className='imgContainer'>
            <div className='img_input'>
                <img src={img} alt='profileimg'/>
                <input type="file" name='image' onChange={(e)=>{handleImageChange(e)}}/>
            </div>
            <div className='buttonContainer'>
                <button onClick={imgClick}>사진 올리기</button>
                <button onClick={removeImage}>사진 지우기</button>
            </div>
        </div>
    </div>
  )
}

export default ImageCheck
