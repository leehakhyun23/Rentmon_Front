import { Box, Button, Checkbox, List, ListItem, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserPage = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/user')
        .then((res) => {
            setUserList(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

    const handleOnChange = (e) => {
        alert("클릭됨");
    }

    return (
        <div>
            유저
            <Box>
                <Paper elevation={3}>
                    <List>
                        <ListItem>아이디    이름    등급    전화번호    이메일      로그인 가능     <Checkbox onChange={handleOnChange}/></ListItem>
                        {userList.map((user, idx) => (
                            <ListItem key={idx}>{user.userid} {user.name} {user.grade.gname} {user.phone} {user.email} {user.islogin === true ? 'Y' : 'N'}<Checkbox /></ListItem>
                        ))}
                    </List>
                    <Box>
                        <Button>수정</Button>
                        <Button>삭제</Button>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
};

export default UserPage;