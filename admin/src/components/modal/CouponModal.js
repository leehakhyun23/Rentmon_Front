import { Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CouponModal({open, handleClose, userids}) {
    const [limitDate, setLimitDate] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if (open && userids.length === 0) {
            alert("유저 ID가 선택되지 않았습니다.");
            handleClose();
        }
    }, [handleClose, open, userids.length]);

    const disablePastDates = (date) => {
        return date.isBefore(dayjs(), 'day');
      };

    const handleIssued = () => {
        const issuedData = {
            userids: userids,
            limitDate: limitDate,
            discount: selectedValue,
        };

        axios.post('/api/admin/issuedcoupon', issuedData)
        .then((res) => {
            if (res.status === 200) {
                alert("발급완료");
            }
        })
        .catch((err) => {
            console.error(err);
        })
        
        handleClose();
    }

    return (
        <div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">쿠폰 발급</Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <FormControl>
                        <FormLabel>Coupon</FormLabel>
                        <RadioGroup name="radio-buttons-group" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                            <FormControlLabel value="1000" control={<Radio />} label="1000원" />
                            <FormControlLabel value="2000" control={<Radio />} label="2000원" />
                            <FormControlLabel value="3000" control={<Radio />} label="3000원" />
                        </RadioGroup>
                    </FormControl>
                </Typography>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select date"
                            value={limitDate}
                            onChange={(limit) => {setLimitDate(limit);}}
                            shouldDisableDate={disablePastDates}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    List : {userids.map((user, idx) => (`${user}, `))}
                    <Button onClick={handleIssued}>발급하기</Button>
                </Box>
            </Box>
          </Modal>
        </div>
    );
}