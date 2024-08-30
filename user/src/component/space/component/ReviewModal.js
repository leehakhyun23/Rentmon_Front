import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import jaxios from "../../../util/jwtUtil";
import ReactStars from "react-rating-stars-component";

function ReviewModal({ reviewopen, setReviewopen, getList }) {
  let user = useSelector((state) => state.user);
  let { sseq } = useParams();
  const [space, setSpace] = useState();
  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);
  const [images, setImages] = useState([]);
  let [issubmit, setisSubmit] = useState(false);
  let [data, setData] = useState({});

  useEffect(() => {
    jaxios
      .get(`/api/space/getSpace/${sseq}`)
      .then((result) => {
        setSpace(result.data.space);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setData({
      space: space,
      user: user,
      content: content,
      rate: rate,
    });
  }, [reviewopen, content, rate, user, sseq]);

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  useEffect(() => {
    setisSubmit(false);
    if (data.content) setisSubmit(true);
  }, [data]);

  let onsubmit = async () => {
    try {
      const formData = new FormData();
      const review = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      formData.append("review", review);
      images.forEach((image) => {
        formData.append(`images`, image);
      });

      let result = jaxios.post("/api/review/InsertReview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setReviewopen();
      getList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReactModal
      isOpen={reviewopen}
      onRequestClose={() => {
        setReviewopen(false);
      }}
    >
      <div className="inquirypopup">
        <h2>리뷰작성</h2>
        <div>
          <div className="row writer">
            <span>작성자 : </span>
            <p className="useridName">{user.userid}</p>
          </div>
          <div className="row">
            <span>별점 : </span>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              value={data.rate}
            />
          </div>
          <div className="row">
            <span>내용 : </span>
            <textarea
              name="title"
              value={data.content}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, content: e.target.value };
                });
              }}
            >
              {" "}
            </textarea>
          </div>
          <div className="review-image-upload-section">
            <span>사진</span>
            <div className="review-image-container">
              {images.map((image, index) => (
                <div className="review-image-preview" key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              ))}
              <div className="review-add-image-button">
                <button
                  className="review-icon-button"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  +
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleAddImage}
                />
              </div>
            </div>
          </div>
          <div className="row btnwrap">
            <button
              className={issubmit ? "active" : ""}
              onClick={() => {
                onsubmit();
              }}
            >
              전송
            </button>
            <button
              onClick={() => {
                setReviewopen(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default ReviewModal;
