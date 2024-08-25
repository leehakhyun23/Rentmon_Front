import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, List, ListItem, Typography, Pagination } from '@mui/material';
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
    const [userSpacePage, setUserSpacePage] = useState(0);
    const [hostUserPage, setHostUserPage] = useState(0);
    const [totalUserSpacePages, setTotalUserSpacePages] = useState(0);
    const [totalHostUserPages, setTotalHostUserPages] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchDeclarations = async () => {
            try {
                const response = await axios.get(`/api/admin/declaration`, {
                    params: {
                        tab: value === 0 ? 'userSpace' : 'hostUser',
                        page: value === 0 ? userSpacePage : hostUserPage,
                        size: size,
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

        fetchDeclarations();
    }, [value, userSpacePage, hostUserPage, size]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleUserSpacePageChange = (event, newPage) => {
        setUserSpacePage(newPage - 1);
    };

    const handleHostUserPageChange = (event, newPage) => {
        setHostUserPage(newPage - 1);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
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
                <label>
                    페이지당 항목 수:
                    <select value={size} onChange={handleSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
                {value === 0 && (
                    <>
                        <List>
                            <ListItem>답변여부 신고자아이디 공간이름 제목 작성일자</ListItem>
                            {userSpaceList.map((decla) => (
                                <ListItem key={decla.dseq}>
                                    {decla.reply === null ? <MarkAsUnreadOutlinedIcon /> : <MarkEmailUnreadIcon />}
                                    {decla.userid}
                                    {decla.spaceTitle}
                                    <Link to={`/declarationview/${decla.dseq}`}>{decla.title}</Link>
                                    {decla.createdAt}
                                </ListItem>
                            ))}
                        </List>
                        <Pagination
                            count={totalUserSpacePages}
                            page={userSpacePage + 1} // Pagination은 1-based 이므로 0-based에서 변환
                            onChange={handleUserSpacePageChange}
                        />
                    </>
                )}
                {value === 1 && (
                    <>
                        <List>
                            <ListItem>답변여부 신고자아이디 호스트아이디 제목 작성일자</ListItem>
                            {hostUserList.map((decla) => (
                                <ListItem key={decla.dseq}>
                                    {decla.reply === null ? <MarkAsUnreadOutlinedIcon /> : <MarkEmailUnreadIcon />}
                                    {decla.userid}
                                    {decla.hostid}
                                    <Link to={`/declarationview/${decla.dseq}`}>{decla.title}</Link>
                                    {decla.createdAt}
                                </ListItem>
                            ))}
                        </List>
                        <Pagination
                            count={totalHostUserPages}
                            page={hostUserPage + 1} // Pagination은 1-based 이므로 0-based에서 변환
                            onChange={handleHostUserPageChange}
                        />
                    </>
                )}
            </Box>
        </div>
    );
};

export default DeclarationPage;
