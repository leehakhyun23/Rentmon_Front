import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MemberPieChart from '../chart/MemberPieChart';
import CategoryPieChart from '../chart/CategoryPieChart';
import ReservationLineChart from '../chart/ReservationChart';

const DashBoard = () => {
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('daily');

    const [pieData, setPieData] = useState(null);
    const [memberData, setMemberData] = useState(null);
    const [reservationData, setReservationData] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/admin/main?period=${period}`)
        .then((res) => {
            if(res.status === 200) {
                console.log(res.data);
                setPieData(res.data.category);
                setMemberData(res.data.member);
                setReservationData(res.data.reservation);
            }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [period]);

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <MemberPieChart data={memberData} />
                    <CategoryPieChart data={pieData} />
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="period-select-label">Period</InputLabel>
                            <Select
                                labelId="period-select-label"
                                value={period}
                                label="Period"
                                onChange={handlePeriodChange}
                            >
                                <MenuItem value="daily">Daily (Last 30 days)</MenuItem>
                                <MenuItem value="weekly">Weekly (Last 15 weeks)</MenuItem>
                                <MenuItem value="monthly">Monthly (Last 12 months)</MenuItem>
                            </Select>
                        </FormControl>
                        <ReservationLineChart data={reservationData} />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default DashBoard;
