import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const ReservationLineChart = ({ data = [] }) => {  // 기본 매개변수 설정
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <Box>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sortedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    {/* 첫 번째 Y축: payment */}
                    <YAxis yAxisId="left" />
                    {/* 두 번째 Y축: count */}
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    {/* 첫 번째 Y축에 매핑된 라인 */}
                    <Line type="monotone" dataKey="payment" stroke="#8884d8" yAxisId="left" />
                    {/* 두 번째 Y축에 매핑된 라인 */}
                    <Line type="monotone" dataKey="count" stroke="#82ca9d" yAxisId="right" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ReservationLineChart;
