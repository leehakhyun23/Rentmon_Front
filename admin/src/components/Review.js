import React, { useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';


const Review = () => {
    const [content, setContent] = useState("");
    const [rate, setRate] = useState(0);
    const [images, setImages] = useState([]);

    const contentChange = (e) => {
        setContent(e.target.value);   
    }

    const rateChange = (e) => {
        setRate(e.target.value);   
    }

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleOnSubmit = () => {
        const formData = new FormData();

        const review = new Blob([JSON.stringify({
            content: content,
            rate: rate,
        })], {
            type: "application/json",
        });
        // formData.append('review', JSON.stringify({
        //     content: content,
        //     rate: rate,
        // }));
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
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <div>
            <Box>내용<TextField label="Outlined" variant="outlined" value={content} onChange={contentChange}/></Box>
            <Box>별점<TextField label="Outlined" variant="outlined" value={rate} onChange={rateChange}/></Box>
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
    );
};

export default Review;