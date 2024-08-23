import { Box, List, ListItem, Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CouponPage = () => {
    const [couponList, setCouponList] = useState([]);
    const [paging, setPaging] = useState({});

    useEffect(() => {
        axios.get("/api/admin/coupon")
        .then((res) => {
            if (res.status === 200) {
                setCouponList(res.data.content);
                setPaging(res.data.page);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [paging]);

    return (
        <div>
            <h1>발급된 쿠폰</h1>
            <List>
                <ListItem>쿠폰코드 쿠폰명 금액 사용기한 사용유무 유저아이디</ListItem>
                {couponList.map((coupon, idx) => (
                    <ListItem key={idx}>
                        {coupon.couponstr} {coupon.couponTitle} {coupon.dicount} {coupon.limitdate} {coupon.useyn === true ? '사용가능' : '사용함'} {coupon.user.userid}
                    </ListItem>
                ))}
            </List>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={paging.totalPages} page={paging.page + 1} /*onChange={handlePageChange}*/ color="primary"/>
            </Box>
        </div>
    );
};

export default CouponPage;