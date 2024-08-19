import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';


const Review = (props) => {
    const user = useSelector(state => state.user);
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

    useEffect( async ()=>{
        try {
            console.log(props.space);
            const result = await axios.get(`/api/review/GetReviews/${props.space.sseq}`);
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

    return (
        <div>
            <Box>아이디<TextField label="Outlined" variant="outlined" value={user.userid} aria-readonly/></Box>
            <Box>내용<TextField label="Outlined" variant="outlined" value={content} onChange={contentChange}/></Box>
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
    );
};

export default Review;