import { Box, Button, Checkbox, List, ListItem, Pagination, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserPage = () => {
    const [userList, setUserList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const fetchUserList = () => {
        axios.get('/api/admin/user')
        .then((res) => {
            setUserList(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        fetchUserList();
    }, [])

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
                fetchUserList();
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <div>
            유저
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Paper elevation={3}>
                    <List>
                        <ListItem>아이디    이름    등급    전화번호    이메일      회원가입일      로그인 가능      <Checkbox onChange={handleOnChange} checked={selectAll}/></ListItem>
                        {userList.map((user, idx) => (
                            <ListItem key={idx}>{user.userid} {user.member.nickname} {user.gnum.gname} {user.phone} {user.email} {user.created_at} {user.islogin === true ? 'Y' : 'N'}
                                <Checkbox checked={checked.includes(user.userid)} onChange={() => handleCheckboxChange(user.userid)}/>
                            </ListItem>
                        ))}
                    </List>
                    <Pagination count={10} color="primary" />
                    <Box>
                        <Button onClick={handleIsLoginUpdate}>수정</Button>
                        <Button>삭제</Button>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
};

export default UserPage;