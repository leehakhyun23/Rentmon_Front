import { Box, Button, ButtonGroup, Checkbox, FormControl, InputLabel, List, ListItem, MenuItem, Pagination, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CouponModal from '../modal/CouponModal';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const UserPage = () => {
    const [userList, setUserList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [paging, setPaging] = useState({ page: 0, size: 10, totalPages: 1 });

    const [searchType, setSearchType] = useState("name");
    const [keyword, setKeyword] = useState("");
    const [sortByDeclasCount, setSortByDeclasCount] = useState(false);
    const [isLogin, setIsLogin] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchUserList = () => {
        const params = {
            page: paging.page,
            size: paging.size,
            searchType,
            keyword,
            sortByDeclasCount,
            isLogin,
        };

        axios.get('/api/admin/user', { params })
        .then((res) => {
            setUserList(res.data.content);
            setPaging({ 
                page: res.data.page.number, 
                size: res.data.page.size, 
                totalPages: res.data.page.totalPages 
            });
         })
        .catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        fetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortByDeclasCount, isLogin, paging.page]);

    const handlePageChange = (e, value) => {
        setPaging(prev => ({ ...prev, page: value - 1 }));
    };

    const handleOnChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        if (newSelectAll) {
            setChecked(userList.map(user => user.userid));
        } else {
            setChecked([]);
        }
    };

    const handleCheckboxChange = (userid) => {
        setChecked(prevChecked => {
            if (prevChecked.includes(userid)) {
                const updatedChecked = prevChecked.filter(id => id !== userid);
                setSelectAll(false);
                return updatedChecked;
            } else {
                const updatedChecked = [...prevChecked, userid];
                if (updatedChecked.length === userList.length) {
                    setSelectAll(true);
                }
                return updatedChecked;
            }
        });
    };

    const handleIsLoginUpdate = () => {
        axios.put('/api/admin/islogin', checked)
        .then((res) => {
            if (res.status === 200) {
                alert(`${res.data}명의 상태 변경 완료`);
                setChecked([]);
                setSelectAll(false);
                setPaging(prev => ({ ...prev, page: 0 }));
                fetchUserList();
            }
        })
        .catch((err) => {
            console.error(err);
        })
    };

    const handleSelectChange = (e) => {
        setSearchType(e.target.value);
    }

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearch = () => {
        setPaging(prev => ({ ...prev, page: 0 }));
        fetchUserList();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Trigger search on Enter key press
        }
    };

    const handleAllUsersClick = () => {
        setSortByDeclasCount(false);
        setIsLogin(null);
        setPaging(prev => ({ ...prev, page: 0 }));
    };
    
    const handleLoginUsersClick = () => {
        setSortByDeclasCount(false);
        setIsLogin(true);
        setPaging(prev => ({ ...prev, page: 0 }));
    };
    
    const handleNotLoginUsersClick = () => {
        setSortByDeclasCount(false);
        setIsLogin(false);
        setPaging(prev => ({ ...prev, page: 0 }));
    };
    
    const handleHighDeclasClick = () => {
        setSortByDeclasCount(true);
        setIsLogin(null);
        setPaging(prev => ({ ...prev, page: 0 }));
    };

    const handleClearSelection = () => {
        setChecked([]);
        setSelectAll(false);
    };

    return (
        <div>
            <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                유저 관리
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, paddingBottom: 3 }}>
                <Paper sx={{ padding: 1, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ButtonGroup variant="contained">
                            <Button onClick={handleAllUsersClick}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <PeopleIcon />
                                </Box>
                            </Button>
                            <Button onClick={handleLoginUsersClick}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <PersonIcon />
                                </Box>
                            </Button>
                            <Button onClick={handleNotLoginUsersClick}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <PersonOffIcon />
                                </Box>
                            </Button>
                            <Button onClick={handleHighDeclasClick}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <PriorityHighIcon />
                                </Box>
                            </Button>
                        </ButtonGroup>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                <InputLabel id="search-select-label">Search</InputLabel>
                                <Select
                                    labelId="search-select-label"
                                    value={searchType}
                                    label="Search"
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value="name">이름</MenuItem>
                                    <MenuItem value="phone">전화번호</MenuItem>
                                    <MenuItem value="email">이메일</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Keyword"
                                variant="outlined"
                                value={keyword}
                                onChange={handleKeywordChange}
                                onKeyDown={handleKeyDown}
                            />
                            <Button variant="contained" onClick={handleSearch}>
                                검색
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <List>
                        <ListItem sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '15%', textAlign: 'center' }}>아이디</Box>
                            <Box sx={{ width: '15%', textAlign: 'center' }}>닉네임</Box>
                            <Box sx={{ width: '10%', textAlign: 'center' }}>등급</Box>
                            <Box sx={{ width: '15%', textAlign: 'center' }}>전화번호</Box>
                            <Box sx={{ width: '20%', textAlign: 'center' }}>이메일</Box>
                            <Box sx={{ width: '15%', textAlign: 'center' }}>회원가입일</Box>
                            <Box sx={{ width: '10%', textAlign: 'center' }}>신고당한횟수</Box>
                            <Box sx={{ width: '10%', textAlign: 'center' }}>로그인 가능</Box>
                            <Checkbox onChange={handleOnChange} checked={selectAll} />
                        </ListItem>
                        {userList && userList.length > 0 ? (userList.map((user, idx) => (
                            <ListItem key={idx} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '15%', textAlign: 'center' }}>{user.userid}</Box>
                                <Box sx={{ width: '15%', textAlign: 'center' }}>{user.name}</Box>
                                <Box sx={{ width: '10%', textAlign: 'center' }}>{user.gname}</Box>
                                <Box sx={{ width: '15%', textAlign: 'center' }}>{user.phone}</Box>
                                <Box sx={{ width: '20%', textAlign: 'center' }}>{user.email}</Box>
                                <Box sx={{ width: '15%', textAlign: 'center' }}>{user.createdAt}</Box>
                                <Box sx={{ width: '10%', textAlign: 'center' }}>{user.declaCount}</Box>
                                <Box sx={{ width: '10%', textAlign: 'center' }}>{user.login ? 'Y' : 'N'}</Box>
                                <Checkbox checked={checked.includes(user.userid)} onChange={() => handleCheckboxChange(user.userid)} />
                            </ListItem>
                        ))) : (
                            <Typography variant="body1" textAlign="center">
                                No users available.
                            </Typography>
                        )}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination count={paging.totalPages} page={paging.page + 1} onChange={handlePageChange} color="primary" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleOpen} variant="contained" color="primary" sx={{ mr: 2 }}>
                            쿠폰발급
                        </Button>
                        <Button onClick={handleIsLoginUpdate} variant="contained" color="secondary" sx={{ mr: 2 }}>
                            수정
                        </Button>
                        <Button variant="contained" color="error">
                            삭제
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <CouponModal open={open} handleClose={handleClose} userids={checked} onIssued={handleClearSelection} />
        </div>
    );
};

export default UserPage;
