import { Box, Button, ButtonGroup, Checkbox, FormControl, InputLabel, List, ListItem, MenuItem, Pagination, Paper, Select, TextField } from '@mui/material';
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchUserList = (page = 0, size = 10, searchType, keyword) => {
        axios.get(`/api/admin/user?page=${page}&size=${size}&searchType=${searchType}&keyword=${keyword}`)
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
        fetchUserList(paging.page, paging.size, searchType, keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePageChange = (e, value) => {
        fetchUserList(paging.page, paging.size, searchType, keyword);
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
                return prevChecked.filter(id => id !== userid);
            } else {
                return [...prevChecked, userid];
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
                fetchUserList(0, 10, searchType, keyword);
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
        fetchUserList(0, 10, searchType, keyword);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchUserList(0, 10, searchType, keyword);
        }
    };

    return (
        <div>
            유저
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <ButtonGroup variant="contained">
                            <Button startIcon={<PeopleIcon />}/>
                            <Button startIcon={<PersonIcon />}/>
                            <Button startIcon={<PersonOffIcon />}/>
                            <Button startIcon={<PriorityHighIcon />}/>
                        </ButtonGroup>
                    </Box>
                    <Box>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Search</InputLabel>
                            <Select value={searchType} label="Search" onChange={handleSelectChange}>
                                <MenuItem value="name">이름</MenuItem>
                                <MenuItem value="phone">전화번호</MenuItem>
                                <MenuItem value="email">이메일</MenuItem>
                            </Select>
                            </FormControl>
                        <TextField label="Keyword" variant="outlined" value={keyword} onChange={handleKeywordChange} onKeyDown={handleKeyDown}/>
                        <Button variant="contained" onClick={handleSearch}>검색</Button>
                    </Box>
                </Box>
                <Paper elevation={3}>
                    <Box>
                        <List>
                            <ListItem>아이디    닉네임    등급    전화번호    이메일      회원가입일    신고당한횟수      로그인 가능      <Checkbox onChange={handleOnChange} checked={selectAll}/></ListItem>
                            {userList.map((user, idx) => (
                                <ListItem key={idx}>{user.userid} {user.name} {user.gname} {user.phone} {user.email} {user.createdAt} {user.declaCount} {user.islogin === true ? 'Y' : 'N'}
                                    <Checkbox checked={checked.includes(user.userid)} onChange={() => handleCheckboxChange(user.userid)}/>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination count={paging.totalPages} page={paging.page + 1} onChange={handlePageChange} color="primary"/>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={handleOpen}>쿠폰발급</Button>
                        <Button onClick={handleIsLoginUpdate}>수정</Button>
                        <Button>삭제</Button>
                    </Box>
                </Paper>
            </Box>
            <CouponModal open={open} handleClose={handleClose} userids={checked}/>
        </div>
    );
};

export default UserPage;