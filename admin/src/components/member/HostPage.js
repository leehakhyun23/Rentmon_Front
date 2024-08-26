import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControl, InputLabel, List, ListItem, MenuItem, Pagination, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HostPage = () => {
    const [hostList, setHostList] = useState([]);
    const [paging, setPaging] = useState({ page: 0, size: 10, totalPages: 1 });
    const [searchType, setSearchType] = useState('hostid');
    const [keyword, setKeyword] = useState('');
    const [noResults, setNoResults] = useState(false);

    const fetchHostList = (page = 0, size = 10, searchType = 'hostid', keyword = '') => {
        axios.get(`/api/admin/host?page=${page}&size=${size}&searchType=${searchType}&keyword=${keyword}`)
            .then((res) => {
                if (res.status === 200) {
                    setHostList(res.data.content);
                    setPaging({
                        page: res.data.page.number,
                        size: res.data.page.size,
                        totalPages: res.data.page.totalPages
                    });
                    setNoResults(false);
                } else if (res.status === 204) {
                    alert('검색 결과가 없습니다.');
                }
            })
            .catch((err) => {
                if (err.response.status === 204) {
                    setHostList([]);
                    setPaging({ page: 0, size: 10, totalPages: 0 });
                    setNoResults(true);
                } else {
                    console.error('Error fetching host list:', err);
                }
            });
    };

    const handlePageChange = (e, value) => {
        fetchHostList(value - 1, paging.size, searchType, keyword);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        fetchHostList(0, paging.size, searchType, keyword);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        fetchHostList(paging.page, paging.size);
    }, [paging.page, paging.size]);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                호스트 관리
            </Typography>
            <Paper sx={{ padding: 3, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, marginBottom: 3 }}>
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="search-type-label">검색 조건</InputLabel>
                        <Select
                            labelId="search-type-label"
                            value={searchType}
                            label="검색 조건"
                            onChange={handleSearchTypeChange}
                        >
                            <MenuItem value="hostid">아이디</MenuItem>
                            <MenuItem value="nickname">닉네임</MenuItem>
                            <MenuItem value="phone">전화번호</MenuItem>
                            <MenuItem value="email">이메일</MenuItem>
                            <MenuItem value="title">공간명</MenuItem>
                            <MenuItem value="category">카테고리</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="검색어"
                        variant="outlined"
                        value={keyword}
                        onChange={handleKeywordChange}
                        onKeyDown={handleKeyDown}
                        sx={{ minWidth: 300 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        검색
                    </Button>
                </Box>
                <List sx={{ width: '100%', borderCollapse: 'collapse' }}>
                    <ListItem sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd', padding: '10px', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.05em', }}>
                        <Typography variant="body2" sx={{ width: '22%', fontWeight: 'bold' }}>아이디</Typography>
                        <Typography variant="body2" sx={{ width: '18%', fontWeight: 'bold' }}>닉네임</Typography>
                        <Typography variant="body2" sx={{ width: '20%', fontWeight: 'bold' }}>전화번호</Typography>
                        <Typography variant="body2" sx={{ width: '20%', fontWeight: 'bold' }}>이메일</Typography>
                        <Typography variant="body2" sx={{ width: '8%', fontWeight: 'bold' }}>공간</Typography>
                    </ListItem>
                    {noResults ? (
                        <Typography variant="body1" textAlign="center" sx={{ margin: 2 }}>
                            검색 결과가 없습니다.
                        </Typography>
                    ) : (
                        hostList.map((host, idx) => (
                            <Accordion key={idx} sx={{ marginBottom: '10px', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${idx}-content`}
                                    id={`panel${idx}-header`}
                                    sx={{ backgroundColor: '#fafafa' }}
                                >
                                    <Typography sx={{ width: '22%' }}>{host.hostid}</Typography>
                                    <Typography sx={{ width: '18%' }}>{host.nickname}</Typography>
                                    <Typography sx={{ width: '20%' }}>{host.phone || '-'}</Typography>
                                    <Typography sx={{ width: '20%' }}>{host.email || '-'}</Typography>
                                    <Typography sx={{ width: '8%', fontWeight: 'bold' }}>
                                        {host.spaces && host.spaces.length > 0 ? '있음' : '없음'}
                                    </Typography>
                                </AccordionSummary>
                                {host.spaces && host.spaces.length > 0 && (
                                    <AccordionDetails>
                                        <List sx={{ width: '100%' }}>
                                            <ListItem
                                                sx={{
                                                    fontWeight: 'bold',
                                                    borderBottom: '2px solid #ddd',
                                                    backgroundColor: '#f5f5f5',
                                                    padding: '10px'
                                                }}
                                            >
                                                <Typography sx={{ width: '25%' }}>공간명</Typography>
                                                <Typography sx={{ width: '15%' }}>카테고리</Typography>
                                                <Typography sx={{ width: '35%' }}>주소</Typography>
                                                <Typography sx={{ width: '10%', textAlign: 'center' }}>신고당한횟수</Typography>
                                                <Typography sx={{ width: '10%', textAlign: 'center' }}>공개</Typography>
                                                <Checkbox />
                                            </ListItem>

                                            {host.spaces.map((space, spaceIdx) => (
                                                <ListItem
                                                    key={spaceIdx}
                                                    sx={{
                                                        borderBottom: '1px solid #ddd',
                                                        padding: '10px',
                                                        backgroundColor: spaceIdx % 2 === 0 ? '#f9f9f9' : '#fff',
                                                    }}
                                                >
                                                    <Typography sx={{ width: '25%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{space.title}</Typography>
                                                    <Typography sx={{ width: '15%' }}>{space.category}</Typography>
                                                    <Typography sx={{ width: '35%' }}>{`${space.province} ${space.town} ${space.village} ${space.addressdetail}`}</Typography>
                                                    <Typography sx={{ width: '10%', textAlign: 'center' }}>{space.declaCount}</Typography>
                                                    <Typography sx={{ width: '10%', textAlign: 'center' }}>{space.disable ? "Show" : "Hide"}</Typography>
                                                    <Checkbox />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                )}
                            </Accordion>
                        ))
                    )}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Pagination
                        count={paging.totalPages}
                        page={paging.page + 1}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginRight: 5, gap: 2 }}>
                    <Button variant="contained" color="primary">
                        변경
                    </Button>
                    <Button variant="contained" color="error">
                        삭제
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default HostPage;
