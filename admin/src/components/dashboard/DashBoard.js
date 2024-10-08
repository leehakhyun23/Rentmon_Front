import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, Select, MenuItem, Paper, Typography, CircularProgress } from '@mui/material';
import MemberPieChart from '../chart/MemberPieChart';
import CategoryPieChart from '../chart/CategoryPieChart';
import ReservationLineChart from '../chart/ReservationChart';
import VisitChart from '../chart/VisitChart';

const DashBoard = () => {
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('daily');

    const [pieData, setPieData] = useState(null);
    const [memberData, setMemberData] = useState(null);
    const [reservationData, setReservationData] = useState(null);
    const [visitData, setVisitData] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/admin/main?period=${period}`)
        .then((res) => {
            if(res.status === 200) {
                setVisitData(res.data.visit);
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
                        <Paper sx={{ flex: 1, padding: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Visitor Trends
                            </Typography>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <VisitChart data={visitData} />
                            </Box>
                        </Paper>
                        <Paper sx={{ flex: 1, padding: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Member Distribution
                            </Typography>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <MemberPieChart data={memberData} />
                            </Box>
                        </Paper>
                        <Paper sx={{ flex: 1, padding: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Category Distribution
                            </Typography>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <CategoryPieChart data={pieData} />
                            </Box>
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
                                <MenuItem value="daily">일 (최근 30일)</MenuItem>
                                <MenuItem value="weekly">주 (최근 15주)</MenuItem>
                                <MenuItem value="monthly">월 (최근 1년)</MenuItem>
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
