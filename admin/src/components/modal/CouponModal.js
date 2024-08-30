import { Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function CouponModal({ open, handleClose, userids, onIssued }) {
    const [limitDate, setLimitDate] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [couponTitle, setCouponTitle] = useState("");

    useEffect(() => {
        if (open && userids.length === 0) {
            alert("유저 ID가 선택되지 않았습니다.");
            setLimitDate(null);
            setSelectedValue(null);
            setCouponTitle("");
            handleClose();
        }
    }, [handleClose, open, userids.length]);

    const disablePastDates = (date) => {
        return date.isBefore(dayjs(), 'day');
    };

    const handleIssued = () => {
        const issuedData = {
            userids: userids,
            limitDateTime: limitDate ? limitDate.toISOString() : null,
            discount: selectedValue,
            couponTitle: couponTitle,
        };

        axios.post('/api/admin/issuedcoupon', issuedData)
            .then((res) => {
                if (res.status === 200) {
                    alert("발급완료");
                    onIssued();
                }
            })
            .catch((err) => {
                console.error(err);
            });

        setLimitDate(null);
        setSelectedValue(null);
        setCouponTitle("");
        handleClose();
    };

    const couponTitleChange = (e) => {
        setCouponTitle(e.target.value);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                    쿠폰 발급
                </Typography>
                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <FormLabel component="legend">할인 금액 선택</FormLabel>
                    <RadioGroup
                        name="radio-buttons-group"
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        row
                    >
                        <FormControlLabel value="3000" control={<Radio />} label="3000원" />
                        <FormControlLabel value="5000" control={<Radio />} label="5000원" />
                        <FormControlLabel value="10000" control={<Radio />} label="10000원" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    label="쿠폰명"
                    variant="outlined"
                    value={couponTitle}
                    onChange={couponTitleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={limitDate}
                        onChange={(limit) => setLimitDate(limit)}
                        shouldDisableDate={disablePastDates}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        선택된 유저 목록: {userids.join(', ')}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleIssued} fullWidth>
                        발급하기
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}