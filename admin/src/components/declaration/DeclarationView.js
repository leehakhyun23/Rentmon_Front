import { Box, Button, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DeclarationView = () => {
    const { dseq } = useParams();
    const [declaration, setDeclaration] = useState({});

    useEffect(() => {
        axios.get(`/api/admin/declarationview/${dseq}`)
        .then((res) => {
            setDeclaration(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [dseq])

    return (
        <div>
            신고 상세보기

            <Paper elevation={3}>
                <Box>
                    <Box>{declaration.title}</Box>
                    <Box>{declaration.created_at}</Box>
                </Box>
                <Box>
                    {declaration.content}
                </Box>
                {declaration.reply === null ? <Box><Button>답변</Button><Button>목록</Button></Box> : <Box>{declaration.reply} {declaration.replydate} <Button>목록</Button></Box>}
            </Paper>
        </div>
    );
};

export default DeclarationView;