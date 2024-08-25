import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, List, ListItem, Typography, Pagination, Paper, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { IconPencilOff, IconPencilCheck } from '@tabler/icons-react';

const DeclarationPage = () => {
    const [value, setValue] = useState(0);
    const [userSpaceList, setUserSpaceList] = useState([]);
    const [hostUserList, setHostUserList] = useState([]);
    const [userSpacePage, setUserSpacePage] = useState(0);
    const [hostUserPage, setHostUserPage] = useState(0);
    const [totalUserSpacePages, setTotalUserSpacePages] = useState(0);
    const [totalHostUserPages, setTotalHostUserPages] = useState(0);
    const [size, setSize] = useState(10);

    const fetchDeclarations = async (params = {}) => {
        try {
            const response = await axios.get(`/api/admin/declaration`, {
                params: {
                    tab: value === 0 ? 'userSpace' : 'hostUser',
                    page: value === 0 ? userSpacePage : hostUserPage,
                    size: size,
                    ...params
                }
            });

            const data = response.data;
            if (value === 0) {
                setUserSpaceList(data.userSpaceList);
                setTotalUserSpacePages(data.totalPages);
            } else {
                setHostUserList(data.hostUserList);
                setTotalHostUserPages(data.totalPages);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchDeclarations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, userSpacePage, hostUserPage, size]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleUserSpacePageChange = (e, newPage) => {
        setUserSpacePage(newPage - 1);
    };

    const handleHostUserPageChange = (e, newPage) => {
        setHostUserPage(newPage - 1);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleAllClick = () => {
        fetchDeclarations();
    };

    const handleProcessedClick = () => {
        fetchDeclarations({ page: 0, reply: 'notNull' });
    };

    const handleUnprocessedClick = () => {
        fetchDeclarations({ page: 0, reply: 'null' });
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                신고 목록
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary" startIcon={<ReorderIcon />} onClick={handleAllClick}>
                        전체 목록
                    </Button>
                    <Button variant="contained" color="success" startIcon={<PlaylistAddCheckIcon />} onClick={handleProcessedClick}>
                        처리 완료
                    </Button>
                    <Button variant="contained" color="error" startIcon={<PlaylistRemoveIcon />} onClick={handleUnprocessedClick}>
                        미처리
                    </Button>
                </Box>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="page-size-label">페이지당 항목 수</InputLabel>
                    <Select
                        labelId="page-size-label"
                        value={size}
                        onChange={handleSizeChange}
                        label="페이지당 항목 수"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="declaration tabs"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="User Reporting Space" />
                <Tab label="Host Reporting User" />
            </Tabs>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
                {value === 0 && (
                    <>
                        <List>
                            <ListItem sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd', padding: '10px', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <Typography sx={{ width: '10%', textAlign: 'center' }}>답변여부</Typography>
                                <Typography sx={{ width: '20%', textAlign: 'center' }}>신고자아이디</Typography>
                                <Typography sx={{ width: '30%', textAlign: 'center' }}>공간이름</Typography>
                                <Typography sx={{ width: '20%', textAlign: 'center' }}>제목</Typography>
                                <Typography sx={{ width: '20%', textAlign: 'center' }}>작성일자</Typography>
                            </ListItem>
                            {userSpaceList.map((decla) => (
                                <ListItem key={decla.dseq} sx={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                                    <Box sx={{ width: '10%', textAlign: 'center' }}>
                                        {decla.reply === null ? <IconPencilOff /> : <IconPencilCheck />}
                                    </Box>
                                    <Typography sx={{ width: '20%', textAlign: 'center' }}>{decla.userid}</Typography>
                                    <Typography sx={{ width: '30%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center' }}>{decla.spaceTitle}</Typography>
                                    <Button 
                                        component={Link} 
                                        to={`/declarationview/${decla.dseq}`} 
                                        variant="text" 
                                        sx={{ width: '20%', textAlign: 'center', color: 'black' }}
                                    >
                                        {decla.title}
                                    </Button>
                                    <Typography sx={{ width: '20%', textAlign: 'center' }}>{decla.createdAt}</Typography>
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalUserSpacePages}
                                page={userSpacePage + 1}
                                onChange={handleUserSpacePageChange}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
                {value === 1 && (
                    <>
                        <List>
                            <ListItem sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd', padding: '10px', backgroundColor: '#f5f5f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <Typography sx={{ width: '10%', textAlign: 'center' }}>답변여부</Typography>
                                <Typography sx={{ width: '20%', textAlign: 'center' }}>신고자아이디</Typography>
                                <Typography sx={{ width: '20%', textAlign: 'center' }}>호스트아이디</Typography>
                                <Typography sx={{ width: '30%', textAlign: 'center' }}>제목</Typography>
                                <Typography sx={{ width: '20%', textAlign: 'center' }}>작성일자</Typography>
                            </ListItem>
                            {hostUserList.map((decla) => (
                                <ListItem key={decla.dseq} sx={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                                    <Box sx={{ width: '10%', textAlign: 'center' }}>
                                        {decla.reply === null ? <IconPencilOff /> : <IconPencilCheck />}
                                    </Box>
                                    <Typography sx={{ width: '20%', textAlign: 'center' }}>{decla.userid}</Typography>
                                    <Typography sx={{ width: '20%', textAlign: 'center' }}>{decla.hostid}</Typography>
                                    <Button 
                                        component={Link} 
                                        to={`/declarationview/${decla.dseq}`} 
                                        variant="text" 
                                        sx={{ width: '30%', textAlign: 'center', color: 'black' }}
                                    >
                                        {decla.title}
                                    </Button>
                                    <Typography sx={{ width: '20%', textAlign: 'center' }}>{decla.createdAt}</Typography>
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalHostUserPages}
                                page={hostUserPage + 1}
                                onChange={handleHostUserPageChange}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default DeclarationPage;
