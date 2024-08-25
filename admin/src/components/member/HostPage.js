import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, List, ListItem, Pagination, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HostPage = () => {
    const [hostList, setHostList] = useState([]);
    const [paging, setPaging] = useState({ page: 0, size: 10, totalPages: 1 });

    const fetchHostList = (page = 0, size = 10) => {
        axios.get(`/api/admin/host?page=${page}&size=${size}`)
        .then((res) => {
            if (res.status === 200) {
                setHostList(res.data.content);
                setPaging({ 
                    page: res.data.page.number, 
                    size: res.data.page.size, 
                    totalPages: res.data.page.totalPages 
                })

                console.log(res.data);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    const handlePageChange = (e, value) => {
        fetchHostList(value - 1, paging.size/*, searchType, keyword*/);
    };

    useEffect(() => {
        fetchHostList(paging.page, paging.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                호스트 관리
            </Typography>
            <Paper sx={{paddingBottom: 3}}>
                <List sx={{ width: '100%', borderCollapse: 'collapse' }}>
                    <ListItem sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd', padding: '10px', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.05em', }}>
                        <Typography variant="body2" sx={{ width: '22%', fontWeight: 'bold' }}>아이디</Typography>
                        <Typography variant="body2" sx={{ width: '18%', fontWeight: 'bold' }}>닉네임</Typography>
                        <Typography variant="body2" sx={{ width: '20%', fontWeight: 'bold' }}>전화번호</Typography>
                        <Typography variant="body2" sx={{ width: '20%', fontWeight: 'bold' }}>이메일</Typography>
                        <Typography variant="body2" sx={{ width: '8%', fontWeight: 'bold' }}>공간</Typography>
                    </ListItem>
                    {hostList.map((host, idx) => (
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
                    ))}
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