import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getCookie, setAuthoCookie } from '../../util/cookieUtil';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import KakaoMap from '../../util/KakaoMap';

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


  const [kakaoAddress, setKakaoAddress] = useState("");

  const contentChange = (e) => {
    if (e && e.target) {
      setContent(e.target.value);
    }
  };

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };



  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (space.sseq) {
          const result = await axios.get(`/api/review/GetReviews/${space.sseq}`);
          setReviewList(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();

    // 정리 함수
    return () => {
      setReviewList([]); // 언마운트 시 리뷰 리스트 초기화
    };
  }, [space.sseq]);

  const handleOnSubmit = () => {
    const formData = new FormData();

    const review = new Blob([JSON.stringify({
      space: space,
      user: user,
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
          setKakaoAddress(`${result.data.province} ${result.data.town} ${result.data.village} ${result.data.addressdetail}`);
        })
        .catch((err) => { console.error(err) });

    }, []
  )

  // // 지도 생성
  // useEffect(() => {
  //   if (window.kakao && window.kakao.maps) {
  //     const container = document.getElementById('map');
  //     const options = { center: new kakao.maps.LatLng(37.5718407, 126.9872086) };
  //     const kakaoMap = new kakao.maps.Map(container, options);
  //     const markerPosition = new kakao.maps.LatLng(37.5718407, 126.9872086);
  //     const marker = new kakao.maps.Marker({
  //       position: markerPosition
  //     });
  //     marker.setMap(kakaoMap);

  //     return () => {
  //       kakaoMap.setCenter(null);  // 지도 리소스 정리
  //       marker.setMap(null); // 마커도 제거
  //     };
  //   } else {
  //     console.error('Kakao Maps API is not loaded');
  //   }
  // }, []);

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
    <div className='spaceContainer innerContainer'>
      <div>
        {/* spaceMenu Part */}
        <div className="SpaceMenu-container">
          <div className="SpaceMenu-item">공간소개</div>
          <div className="SpaceMenu-item">시설안내</div>
          <div className="SpaceMenu-item">위치확인</div>
          <div className="SpaceMenu-item">예약하기</div>
          <div className="SpaceMenu-item">리뷰</div>
        </div>

        {/* spaceInfo Part */}
        <div className="spaceInfo">
          <div className="spaceMainTitle">공간 소개</div>
          {<Slider {...settings}>
            {space.spaceimage && space.spaceimage.map((image, idx) => (
              <img key={idx} src={`http://localhost:8070/space_images/${image.realName}`} alt={space.title} />
            ))}
          </Slider>}
          <div className="spaceTitle">제목</div>
          <div className="spaceContent"> {space.sseq}. {space.title} </div>
          <div className="spaceTitle">부제목</div>
          <div className="spaceContent"> {space.subtitle} </div>
          <div className="spaceTitle">내용</div>
          <div className="spaceContent"> {space.content} </div>
          <div className="spaceTitle">이용 시 주의사항</div>
          <div className="spaceContent"> {space.caution} </div>

          <div className="spaceTitle">대여가능 시간</div>
          <div className="spaceContent"> {space.starttime}시 ~ {space.endtime}시 </div>
          <div className="spaceTitle">주소</div>
          <div className="spaceContent"> {space.province} {space.town} {space.village} {space.addressdetail} </div>
          <div className="spaceTitle">최대 수용인원</div>
          <div className="spaceContent"> {space.maxpersonnal}인 </div>
        </div>


        <div className="spaceFacilities">
          <div className="spaceMainTitle">시설 안내</div>
          {
            (space.facilities) ? (
              space.facilities.map((facil, idx) => {
                return (
                  <div key={facil.facility.fnum}>
                    <div>{facil.facility.name}</div>
                    <div>{facil.facility.fnum}</div>
                  </div>
                )
              })
            ) : (null)
          }
        </div>

        <div className="spaceMap">
          <div className="spaceMainTitle">위치 확인</div>
            <KakaoMap address={kakaoAddress}/>
          {/* <div className='subPage'>
            <div className="customer" style={{ flex: "4" }}>
              <div id='map' style={{ width: "600px", height: "400px", margin: "20px" }}></div>
            </div>
          </div> */}
        </div>


        <div className="spaceButton">
          <div className="spaceMainTitle">예약하기</div>

          <button onClick={() => { navigate(`/reservationForm/${space.sseq}`) }}>예약하기</button>
          <button onClick={() => { }}>찜하기</button>
          <button onClick={() => { }}>문의하기(채팅)</button>
          <button onClick={() => { }}>신고하기</button>
        </div>

        <div className="spaceReviewInsert">
          <div className="spaceMainTitle">리뷰 확인</div>

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
        </div>

        <div className="spaceReviewRead">
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
                  {review.images && (
                    <Slider {...settings}>
                      {review.images.map((img, idx) => (
                        <div key={idx}>
                          <img
                            src={`http://localhost:8070/review_images/${img.realname}`}
                            alt={`리뷰 이미지 ${idx}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                          />
                        </div>
                      ))}
                    </Slider>
                  )}
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
    </div>

  )
}

export default SpaceDetail
