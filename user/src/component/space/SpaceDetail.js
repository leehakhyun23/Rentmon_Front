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
import InqueryModal from './component/InqueryModal';
import "./style/inquiry.css"
import InquiryList from './component/InquiryList';
import ReviewList from './component/ReviewList';


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
  const [inquiryopen, setInquiryopen] = useState(false);
  const [reviewopen, setReviewopen] = useState(false);
  const user = useSelector(state => state.user);
  const [space, setSpace] = useState({});
  const { sseq } = useParams();
  const navigate = useNavigate();


  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);
  const [images, setImages] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [zzimCount, setZzimCount] = useState();
  const [kakaoAddress, setKakaoAddress] = useState("");

  // Review 입력
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


  // Review 조회
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


  // Review 제출
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

  // Space 조회
  useEffect(
    () => {
      axios.get(`/api/space/getSpace/${sseq}`)
        .then((result) => {
          setSpace(result.data.space);
          setInquiryList(result.data.inquiryList);
          setKakaoAddress(`${space.province} ${space.town} ${space.village} ${space.addressdetail}`);
        })
        .catch((err) => { console.error(err) });

    }, []
  )


  useEffect(()=>{
    
    let rctvw = getCookie("rctvw");
    if (rctvw === undefined)rctvw = [];
    if(!rctvw.includes(sseq)){
      if(rctvw.length >= 6) rctvw.pop();
      if(sseq !== undefined) rctvw.unshift(sseq);
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

        </div>


        <div className="spaceButton">
          <div className="spaceMainTitle">예약하기</div>

          <button onClick={() => { navigate(`/reservationForm/${space.sseq}`) }}>예약하기</button>
          <button onClick={() => { }}>찜하기</button>
          <button onClick={() => {setInquiryopen(true) }}>문의하기</button>
          <button onClick={() => {setReviewopen(true) }}>리뷰작성</button>
          <button onClick={() => { }}>신고하기</button>
        </div>
        <InquiryList sseq={sseq} inquiryopen ={inquiryopen}  setInquiryopen={setInquiryopen}/>


        <ReviewList sseq={sseq} reviewopen ={reviewopen}  setReviewopen={setReviewopen}/>

      </div>
     
    </div>

  )
}

export default SpaceDetail
