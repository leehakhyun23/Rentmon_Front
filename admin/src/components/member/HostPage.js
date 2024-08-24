import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Pagination, Typography } from '@mui/material';
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
        <div>
            <Typography variant="h6">호스트</Typography>
            <List style={{ width: '100%', borderCollapse: 'collapse' }}>
                <ListItem style={{ fontWeight: 'bold', borderBottom: '2px solid #ddd', padding: '10px' }}>
                    아이디 닉네임 전화번호 이메일 공간 카테고리 주소 신고당한횟수 isDisplay
                </ListItem>
                {hostList.map((host, idx) => (
                    <Accordion key={idx} style={{ marginBottom: '10px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${idx}-content`}
                            id={`panel${idx}-header`}
                            style={{ backgroundColor: '#f1f1f1' }}
                        >
                            <Typography style={{ display: 'inline-block', width: '10%' }}>{host.hostid}</Typography>
                            <Typography style={{ display: 'inline-block', width: '15%' }}>{host.nickname}</Typography>
                            <Typography style={{ display: 'inline-block', width: '15%' }}>{host.phone === null ? "-" : host.phone}</Typography>
                            <Typography style={{ display: 'inline-block', width: '20%' }}>{host.email === null ? "-" : host.email}</Typography>
                            {/* 이 부분은 다른 정보들과 구분되도록 스타일링만 적용합니다 */}
                            <Typography style={{ display: 'inline-block', width: '40%' }} />
                        </AccordionSummary>
                        <AccordionDetails>
                            <List style={{ width: '100%' }}>
                                {host.spaces.map((space, spaceIdx) => (
                                    <ListItem
                                        key={spaceIdx}
                                        style={{
                                            borderBottom: '1px solid #ddd',
                                            padding: '10px',
                                            backgroundColor: spaceIdx % 2 === 0 ? '#f9f9f9' : '#fff',
                                        }}
                                    >
                                        <Typography style={{ display: 'inline-block', width: '10%' }}>{space.title}</Typography>
                                        <Typography style={{ display: 'inline-block', width: '10%' }}>{space.category}</Typography>
                                        <Typography style={{ display: 'inline-block', width: '15%' }}>
                                            {`${space.province} ${space.town} ${space.village} ${space.addressdetail}`}
                                        </Typography>
                                        <Typography style={{ display: 'inline-block', width: '5%' }}>{space.declaCount}</Typography>
                                        <Typography style={{ display: 'inline-block', width: '5%' }}>{space.disable === true ? "Show" : "Hide"}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
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
        </div>
    );
};

export default HostPage;