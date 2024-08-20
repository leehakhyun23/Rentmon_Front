import { Box, List, ListItem, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ReorderIcon from '@mui/icons-material/Reorder';

const DeclarationPage = () => {
    const [declarationList, setDeclarationList] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/declaration')
        .then((res) => {
            setDeclarationList(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <div>
            신고 목록

            <Paper elevation={3}>
                <Box>
                    <ReorderIcon/><PlaylistAddCheckIcon/><PlaylistRemoveIcon/>
                </Box>
                <Box>
                    <List>
                        <ListItem>답변여부      신고자아이디        공간이름        제목        작성일자</ListItem>
                        
                        {declarationList.map((decla) => (
                            <ListItem key={decla.dseq}>{decla.reply === null ? 'X' : 'O'} {decla.reporter} <Link to={`/declarationview/${decla.dseq}`}>{decla.title}</Link> {decla.created_at}</ListItem>
                        ))}
                    </List>
                </Box>
            </Paper>
        </div>
    );
};

export default DeclarationPage;