import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpaceInfo from './component/SpaceInfo';
import SpaceMenu from './component/SpaceMenu';
import ReviewJJ from './component/ReviewJJ'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getCookie, setAuthoCookie } from '../../util/cookieUtil';

const { kakao } = window;


const settings = {
  dot: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

function SpaceDetail() {
  const user = useSelector(state => state.user);
  const [space, setSpace] = useState({});
  const navigate = useNavigate();
  const { sseq } = useParams();

  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);
  const [images, setImages] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const contentChange = (e) => {
    setContent(e.target.value);
  }

  const rateChange = (e) => {
    setRate(e.target.value);
  }

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };



  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  useEffect(async () => {
    try {
      console.log(space);
      const result = await axios.get(`/api/review/GetReviews/${space.sseq}`);
      console.log(result.data);
      setReviewList(result.data);
    } catch (err) {
      console.error(err);
    }
  }, [])

  const handleOnSubmit = () => {
    const formData = new FormData();

    const review = new Blob([JSON.stringify({
      // space: props.space,
      // user: user,
      content: content,
      rate: rate,
    })], {
      type: "application/json",
    });

    formData.append('review', review);

    images.forEach((image) => {
      formData.append(`images`, image);
    });

    axios.post('/api/review/InsertReview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res.data);
        setContent("");
        setRate(0);
        setImages([]);
      })
      .catch((err) => {
        console.error(err);
      })
  }



  useEffect(
    () => {
      axios.get(`/api/space/getSpace/${sseq}`)
        .then((result) => {
          setSpace(result.data);
        })
        .catch((err) => { console.error(err) });

    }, []
  )

  // 지도 생성
  useEffect(
    () => {
      // 지도의 중심위치 설정이동
      const container = document.getElementById('map');
      const options = { center: new kakao.maps.LatLng(37.5718407, 126.9872086) };
      const kakaoMap = new kakao.maps.Map(container, options);
      // 표시지역 마킹
      const markerPosition = new kakao.maps.LatLng(37.5718407, 126.9872086);
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(kakaoMap);
    }, []
  )


  useEffect(()=>{
    
    let rctvw = getCookie("rctvw");
    if (rctvw === undefined)rctvw = [];
    if(!rctvw.includes(sseq)){
      if(rctvw.length >= 5) rctvw.pop();
      rctvw.push(sseq);
    }
    setAuthoCookie("rctvw", rctvw , 60);
    console.log(rctvw);
  },[]);

  return (
    <div className='innerContainer'>
      <div>
        {/* spaceMenu Part */}
        <div className="SpaceMenu-container">
          <div className="SpaceMenu-item">공간소개</div>
          <div className="SpaceMenu-item">시설안내</div>
          <div className="SpaceMenu-item">주의사항</div>
          <div className="SpaceMenu-item">위치확인</div>
          <div className="SpaceMenu-item">채팅(문의)</div>
          <div className="SpaceMenu-item">리뷰</div>
        </div>

        {/* spaceInfo Part */}
        <div className="space">
          {<Slider {...settings}>
            {space.images && space.images.map((image, idx) => (
              <img key={idx} src={`http://localhost:8070/space_images/${image.realName}`} alt={space.title} />
            ))}
          </Slider>}
          <span onClick={() => { navigate(`/spaceDetail/${space.sseq}`) }}> {space.sseq}. {space.title}</span><br />

          <br /><br /><br />
          <div className="spacetitle">
            공간 소개
            <div className="spacecontent">
              <span> 제목 : {space.title}</span><br />
              <span> 내용 : {space.content}</span><br />
              <span> 가격 : {space.price}</span><br />
              <span> 주소 : </span><br />
              <span> 시간 : </span>
              <span> 해시태그들 : </span>


            </div>


          </div>
          <div className="spacetitle">
            공간 시설 안내
          </div>
          <div className="spacetitle">
            이용 시 주의사항
            <div className="spacecontent">
              <span> 내용 : {space.caution}</span><br />
            </div>
          </div>
          <div className="spacetitle">
            위치정보
          </div>

          <div className='subPage'>
            <div className="customer" style={{ flex: "4" }}>
              <div id='map' style={{ width: "600px", height: "400px", margin: "20px" }}></div>
            </div>
          </div>

          <button onClick={() => { navigate(`/ReservationForm/${space.sseq}`) }}>예약하기</button>
        </div>
      </div>

      <div>
        <Box>아이디<TextField label="Outlined" variant="outlined" value={user.userid} aria-readonly /></Box>
        <Box>내용<TextField label="Outlined" variant="outlined" value={content} onChange={contentChange} /></Box>
        별점<ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rate}
        //isHalf={true}   // 별점 반개 허용(double로 형변환 필요)
        />
        <Box>사진
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #ccc"
            padding="8px"
            borderRadius="4px"
            minHeight="150px"
            position="relative"
            mt={2}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100px"
                height="100px"
                border="1px solid #ccc"
                borderRadius="4px"
                marginRight="8px"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
            <IconButton
              component="label"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <AddIcon />
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleAddImage}
              />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleOnSubmit}>전송</Button>
        </Box>



        {/* 리뷰 리스트 렌더링 */}
        <Box mt={4}>
          <Typography variant="h6">리뷰 목록</Typography>
          {reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <Box key={index} border="1px solid #ccc" borderRadius="4px" padding="16px" mt={2}>
                <Typography variant="subtitle1"><strong>작성자:</strong> {review.user.userid}</Typography>
                <Typography variant="body1"><strong>내용:</strong> {review.content}</Typography>
                <ReactStars
                  count={5}
                  size={24}
                  value={review.rate}
                  edit={false}
                  activeColor="#ffd700"
                />
                {review.reply && (
                  <Typography variant="body2" color="textSecondary">
                    <strong>관리자 답변:</strong> {review.reply}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2">등록된 리뷰가 없습니다.</Typography>
          )}
        </Box>
      </div>
    </div>

  )
}

export default SpaceDetail
