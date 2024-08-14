import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';

function Review(props) {

  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  const [space, setSpace] = useState();
  const [userName, setUserName] = useState("");
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [showForm, setShowForm] = useState(false); // 입력 폼 표시 여부 상태

  // 멀티이미지 입력 및 입력스타일
  const [imgsrc1, setImgsrc1] = useState('');
  const [imgsrc2, setImgsrc2] = useState('');
  const [imgsrc3, setImgsrc3] = useState('');
  const [imgsrc4, setImgsrc4] = useState('');
  const [imgsrc5, setImgsrc5] = useState('');
  const [imgsrc6, setImgsrc6] = useState('');
  const [imgsrc7, setImgsrc7] = useState('');
  const [imgsrc8, setImgsrc8] = useState('');
  const [imgsrc9, setImgsrc9] = useState('');
  const [imgsrc10, setImgsrc10] = useState('');

  const [divStyle2, setDivStyle2] = useState({ display: 'none' });
  const [divStyle3, setDivStyle3] = useState({ display: 'none' });
  const [divStyle4, setDivStyle4] = useState({ display: 'none' });
  const [divStyle5, setDivStyle5] = useState({ display: 'none' });
  const [divStyle6, setDivStyle6] = useState({ display: 'none' });
  const [divStyle7, setDivStyle7] = useState({ display: 'none' });
  const [divStyle8, setDivStyle8] = useState({ display: 'none' });
  const [divStyle9, setDivStyle9] = useState({ display: 'none' });
  const [divStyle10, setDivStyle10] = useState({ display: 'none' });

  const fieldStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "5px 0",
    justifyContent: "space-between",
    border: "1px solid black",
  }

  useEffect(async () => {
    try {
      const result = await axios.get(`/api/review/getReviews/${space.sseq}`)
      setReviewList(result.data);
      console.log(reviewList);
    } catch (err) { console.error() };
  }, []);


  useEffect(() => {
    console.log(images);
  }, [images]);


  // 멀티이미지 입력
  async function imgUpload(e, n) {
    let formData = new FormData();
    formData.append('image', e.target.files[0]);
    const result = await axios.post('/api/review/imgup', formData);
    if (n == 1) {
      setDivStyle2(fieldStyle);
      setImgsrc1(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 2) {
      setDivStyle3(fieldStyle);
      setImgsrc2(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 3) {
      setDivStyle4(fieldStyle);
      setImgsrc3(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 4) {
      setDivStyle5(fieldStyle);
      setImgsrc4(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 5) {
      setDivStyle6(fieldStyle);
      setImgsrc5(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 6) {
      setDivStyle7(fieldStyle);
      setImgsrc6(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 7) {
      setDivStyle8(fieldStyle);
      setImgsrc7(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 8) {
      setDivStyle9(fieldStyle);
      setImgsrc8(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 9) {
      setDivStyle10(fieldStyle);
      setImgsrc9(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    } else if (n == 10) {
      setImgsrc10(`http://localhost:8070/review_images/${result.data.reviewimage}`);
    }

    let arr = [...images];
    arr.push(result.data.reviewimage);
    setImages([...arr]);
    console.log(images);
  }

  // 리뷰 등록
  async function onSubmit() {
    if (!content) { return alert("리뷰를 작성하세요"); }

    console.log(props.space.sseq);
    try {
      await axios.post('/api/review/InsertReview', {
        Space: props.space,
        User: user,
        rate,
        content,
        images
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // 리뷰 전송 후 상태 초기화
      setUserName("");
      setRate(0);
      setContent("");
      setImages([]);

      // 리뷰 리스트를 재조회 및 갱신 (필요시)
      // 예: setReviews(await fetchReviews());


    } catch (err) { console.error(err); }

  }


  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  return (
    <div className="spacetitle">
      <h2>리뷰란</h2>
      <div>
        <input
          type="text"
          placeholder="작성자 이름"
          value={user.name}
          onChange={(e) => setUserName(e.target.value)}
          required
          readOnly
        />
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rate}
        //isHalf={true}   // 별점 반개 허용(double로 형변환 필요)
        />
        <textarea
          placeholder="리뷰 내용란"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className='field' id='img1'>
          <input type="file" onChange={(e) => { imgUpload(e, 1) }} />
        </div>
        <img src={imgsrc1} height="50" />

        <div className='field' id='img2' style={divStyle2}>
          <input type="file" onChange={(e) => { imgUpload(e, 2) }} />
        </div>
        <img src={imgsrc2} height="50" />

        <div className='field' id='img3' style={divStyle3}>
          <input type="file" onChange={(e) => { imgUpload(e, 3) }} />
        </div>
        <img src={imgsrc3} height="50" />

        <div className='field' id='img4' style={divStyle4}>
          <input type="file" onChange={(e) => { imgUpload(e, 4) }} />
        </div>
        <img src={imgsrc4} height="50" />

        <div className='field' id='img5' style={divStyle5}>
          <input type="file" onChange={(e) => { imgUpload(e, 5) }} />
        </div>
        <img src={imgsrc5} height="50" />

        <div className='field' id='img6' style={divStyle6}>
          <input type="file" onChange={(e) => { imgUpload(e, 6) }} />
        </div>
        <img src={imgsrc6} height="50" />

        <div className='field' id='img7' style={divStyle7}>
          <input type="file" onChange={(e) => { imgUpload(e, 7) }} />
        </div>
        <img src={imgsrc7} height="50" />

        <div className='field' id='img8' style={divStyle8}>
          <input type="file" onChange={(e) => { imgUpload(e, 8) }} />
        </div>
        <img src={imgsrc8} height="50" />

        <div className='field' id='img9' style={divStyle9}>
          <input type="file" onChange={(e) => { imgUpload(e, 9) }} />
        </div>
        <img src={imgsrc9} height="50" />

        <div className='field' id='img10' style={divStyle10}>
          <input type="file" onChange={(e) => { imgUpload(e, 10) }} />
        </div>
        <img src={imgsrc10} height="50" />
        <div className='btns'>
          <button onClick={() => { onSubmit() }}>작성완료</button>
        </div>
      </div>

      <div>
        {reviewList.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="review-username">아이디 : {review.user.userid}</span>
              <span className="review-rate">
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={review.rate}
                  readOnly
                /></span>
              <span className="review-date">작성일 : {review.create_at}</span>
            </div>
            <div className="review-content">내용 : {review.content}</div>
            <div className="review-reply">답변 : {review.reply} </div>
            <div className="review-images">
              {review.images.map((image, idx) => (
                <img key={idx} src={URL.createObjectURL(image)} alt={`review-img-${idx}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;