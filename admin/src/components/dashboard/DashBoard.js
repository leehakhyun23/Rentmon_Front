import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, Select, MenuItem, Paper, Typography, CircularProgress } from '@mui/material';
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
        <Box sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Dashboard Overview
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Paper sx={{ flex: 1, padding: 2, boxShadow: 3 }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Member Distribution
                            </Typography>
                            <MemberPieChart data={memberData} />
                        </Paper>
                        <Paper sx={{ flex: 1, padding: 2, boxShadow: 3 }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Category Distribution
                            </Typography>
                            <CategoryPieChart data={pieData} />
                        </Paper>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth variant="outlined" sx={{ boxShadow: 1 }}>
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
                        <Paper sx={{ padding: 2, boxShadow: 3 }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Reservation Trends
                            </Typography>
                            <ReservationLineChart data={reservationData} />
                        </Paper>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DashBoard;
