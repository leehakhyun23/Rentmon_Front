import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

const DeclarationPage = () => {
    const [value, setValue] = useState(0);
    const [userSpaceList, setUserSpaceList] = useState([]);
    const [hostUserList, setHostUserList] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/declaration')
            .then((res) => {
                setUserSpaceList(res.data.content.userSpaceList);
                setHostUserList(res.data.content.hostUserList);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Typography variant="h4">신고 목록</Typography>
            <Box>
                <ReorderIcon /><PlaylistAddCheckIcon /><PlaylistRemoveIcon />
            </Box>
            <Tabs value={value} onChange={handleChange} aria-label="declaration tabs">
                <Tab label="User Reporting Space" />
                <Tab label="Host Reporting User" />
            </Tabs>
            <Box>
                {value === 0 && (
                    <List>
                        <ListItem>답변여부 신고자아이디 공간이름 제목 작성일자</ListItem>
                        {userSpaceList.map((decla) => (
                            <ListItem key={decla.dseq}>
                                {decla.reply === null ? <MarkAsUnreadOutlinedIcon /> : <MarkEmailUnreadIcon />} 
                                {decla.user.id} 
                                {decla.space.name} 
                                <Link to={`/declarationview/${decla.dseq}`}>{decla.title}</Link> 
                                {decla.createdAt}
                            </ListItem>
                        ))}
                    </List>
                )}
                {value === 1 && (
                    <List>
                        <ListItem>답변여부 신고자아이디 호스트아이디 제목 작성일자</ListItem>
                        {hostUserList.map((decla) => (
                            <ListItem key={decla.dseq}>
                                {decla.reply === null ? <MarkAsUnreadOutlinedIcon /> : <MarkEmailUnreadIcon />} 
                                {decla.user.id} 
                                {decla.host.id} 
                                <Link to={`/declarationview/${decla.dseq}`}>{decla.title}</Link> 
                                {decla.createdAt}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </div>
    );
};

export default DeclarationPage;
