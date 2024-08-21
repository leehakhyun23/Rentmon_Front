import React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

const MainPage = () => {
    return (
        <div>
            <Box>
                메인
            </Box>
            <Box>
                <Link to="/userpage">유저목록</Link>
            </Box>
            <Box>
                <Link to="/hostpage">호스트목록</Link>
            </Box>
            <Box>
                <Link to="/couponpage">쿠폰</Link>
            </Box>
            <Box>
                <Link to="/declaration">신고</Link>
            </Box>
        </div>
    );
};

export default MainPage;