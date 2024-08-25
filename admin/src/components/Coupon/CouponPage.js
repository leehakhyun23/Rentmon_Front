import { Box, List, ListItem, Typography, Paper, Pagination, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const CouponPage = () => {
    const [couponList, setCouponList] = useState([]);
    const [paging, setPaging] = useState({
        page: 0,
        size: 10,
        totalPages: 1,
    });
    const [useynFilter, setUseynFilter] = useState(null);

    const fetchCouponList = (page = 0, size = 10, useyn = null) => {
        const params = { page, size };
        if (useyn !== null) {
            params.useyn = useyn;
        }

        axios.get('/api/admin/coupon', { params })
        .then((res) => {
            if (res.status === 200 && res.data.content) {
                setCouponList(res.data.content);
                setPaging({ 
                    page: res.data.page.number, 
                    size: res.data.page.size, 
                    totalPages: res.data.page.totalPages 
                });
            } else {
                setCouponList([]);
            }
        })
        .catch((err) => {
            console.log(err);
            setCouponList([]);
        });
    };

    useEffect(() => {
        fetchCouponList(paging.page, paging.size, useynFilter);
    }, [paging.page, paging.size, useynFilter]);

    const handlePageChange = (event, value) => {
        setPaging((prevPaging) => ({
            ...prevPaging,
            page: value - 1,
        }));
    };

    const handleFilterChange = (filter) => {
        setUseynFilter(filter);
        setPaging((prevPaging) => ({
            ...prevPaging,
            page: 0,
        }));
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                발급된 쿠폰
            </Typography>
            <ButtonGroup variant="contained" sx={{ mb: 2 }}>
                <Button onClick={() => handleFilterChange(null)}>
                    <AllInclusiveIcon /> 전체
                </Button>
                <Button onClick={() => handleFilterChange(true)}>
                    <CheckIcon /> 사용 가능
                </Button>
                <Button onClick={() => handleFilterChange(false)}>
                    <CloseIcon /> 사용 불가
                </Button>
            </ButtonGroup>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
                <List sx={{ width: '100%', borderCollapse: 'collapse' }}>
                    <ListItem 
                        sx={{ 
                            fontWeight: 'bold', 
                            borderBottom: '2px solid #ddd', 
                            padding: '10px', 
                            backgroundColor: '#f5f5f5', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05em' 
                        }}
                    >
                        <Typography sx={{ width: '20%' }}>쿠폰코드</Typography>
                        <Typography sx={{ width: '20%' }}>쿠폰명</Typography>
                        <Typography sx={{ width: '10%' }}>금액</Typography>
                        <Typography sx={{ width: '20%' }}>사용기한</Typography>
                        <Typography sx={{ width: '15%' }}>사용유무</Typography>
                        <Typography sx={{ width: '15%' }}>유저아이디</Typography>
                    </ListItem>
                    {couponList && couponList.length > 0 ? (
                        couponList.map((coupon, idx) => (
                            <ListItem 
                                key={idx} 
                                sx={{ 
                                    padding: '10px', 
                                    borderBottom: '1px solid #ddd',
                                    backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
                                }}
                            >
                                <Typography sx={{ width: '20%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{coupon.couponStr}</Typography>
                                <Typography sx={{ width: '20%' }}>{coupon.title}</Typography>
                                <Typography sx={{ width: '10%' }}>{coupon.discount}</Typography>
                                <Typography sx={{ width: '20%' }}>{coupon.limitDateTime}</Typography>
                                <Typography sx={{ width: '15%' }}>{coupon.useYn === true ? '사용 가능' : '사용함'}</Typography>
                                <Typography sx={{ width: '15%' }}>{coupon.userid}</Typography>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body1" textAlign="center" sx={{ padding: '20px' }}>
                            해당 조건에 맞는 쿠폰이 없습니다.
                        </Typography>
                    )}
                </List>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination 
                    count={paging.totalPages} 
                    page={paging.page + 1}
                    onChange={handlePageChange} 
                    color="primary" 
                />
            </Box>
        </Box>
    );
};


export default CouponPage;
