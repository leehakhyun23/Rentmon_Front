import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';




function Review(props) {
  const user = useSelector(state => state.user);
  const [space, setSpace] = useState();
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { userName, title, content, images, date: new Date().toLocaleString() };
    reviewInsert(newReview);
    setUserName("");
    setTitle("");
    setContent("");
    setImages([]);
  };


  async function reviewInsert() {
    try {
      // 리뷰 추가
      await axios.post('/api/post/reviewInsert', {})

      //리뷰 리스트를 재조회 및 갱신

    } catch (err) {
      console.error(err);
    }



  }

  return (
    <div className="spacetitle">
      리뷰란
      <button onClick={() => { }}>리뷰 입력</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="작성자 이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="리뷰 내용란"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
        />
        <button type="submit">리뷰 작성</button>
      </form>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="review-username">{review.userName}</span>
              <span className="review-title">{review.title}</span>
              <span className="review-date">{review.date}</span>
            </div>
            <div className="review-content">{review.content}</div>
            <div className="review-images">
              {review.images.map((image, idx) => (
                <img key={idx} src={URL.createObjectURL(image)} alt={`review-img-${idx}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
      프로필사진 / userid / rate / content / (reply)

    </div>
  )
}

export default Review
