import { Box, Typography } from '@mui/material';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ["#0088FE", "#00C49F"];

const MemberPieChart = ({ data }) => {
    const chartData = [
        { name: "User", value: data.userCount },
        { name: "Host", value: data.hostCount }
    ];

    return (
        <Box textAlign="center">
            <Typography variant="h6">
                총 회원수: {data.totalMember}
            </Typography>

            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </Box>
    );
};

export default MemberPieChart;
