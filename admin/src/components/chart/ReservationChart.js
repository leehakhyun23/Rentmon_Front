import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const ReservationLineChart = ({ data = [] }) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <Box>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sortedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="payment" stroke="#8884d8" yAxisId="left" name='총예약금액' />
                    <Line type="monotone" dataKey="count" stroke="#82ca9d" yAxisId="right" name='총예약건수' />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ReservationLineChart;
