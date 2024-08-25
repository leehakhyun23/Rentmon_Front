import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';

const DeclarationView = () => {
    const { dseq } = useParams();
    const [declaration, setDeclaration] = useState({});
    const [reply, setReply] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/admin/declarationview/${dseq}`)
            .then((res) => {
                setDeclaration(res.data);
                setReply(res.data.reply || ''); // 이미 존재하는 답변이 있다면 초기화
            })
            .catch((err) => {
                console.error(err);
            });
    }, [dseq]);

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleReplySubmit = () => {
        const replyData = {
            dseq: dseq,
            reply: reply,
            replyDate: new Date().toISOString(),
        };
    
        axios.post('/api/admin/declaration', replyData)
            .then((res) => {
                alert(declaration.reply ? '답글이 성공적으로 수정되었습니다.' : '답글이 성공적으로 작성되었습니다.');
                setDeclaration({ 
                    ...declaration, 
                    reply: reply, 
                    replydate: new Date().toISOString() 
                });
                setIsReplying(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleReplyClick = () => {
        setIsReplying(true);
    };

    const handleBackToList = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>신고 상세보기</Typography>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom>{declaration.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{declaration.created_at}</Typography>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">{declaration.content}</Typography>
                </Box>
                {isReplying ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                            label="답변 작성"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={reply}
                            onChange={handleReplyChange}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" color="primary" size="small" onClick={handleReplySubmit}>
                                {declaration.reply ? '답변 수정' : '답글 작성'}
                            </Button>
                            <Button variant="outlined" color="secondary" size="small" onClick={() => setIsReplying(false)}>
                                취소
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {declaration.reply ? (
                            <>
                                <Typography variant="body1" gutterBottom>답변: {declaration.reply}</Typography>
                                <Typography variant="body2" color="textSecondary">{declaration.replydate}</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="contained" color="primary" size="small" onClick={handleReplyClick}>
                                        답변 수정
                                    </Button>
                                    <Button variant="outlined" size="small" onClick={handleBackToList}>
                                        목록
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" color="primary" size="small" onClick={handleReplyClick}>
                                    답변 작성
                                </Button>
                                <Button variant="outlined" size="small" onClick={handleBackToList}>
                                    목록
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default DeclarationView;
