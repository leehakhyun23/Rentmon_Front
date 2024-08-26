import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot
} from 'recharts';

const CustomizedDot = (props) => {
    const { cx, cy, value } = props;

    if (value > 100) {
        return (
            <Dot
                cx={cx}
                cy={cy}
                r={6}
                fill="#FF8042"
                stroke="#fff"
                strokeWidth={2}
            />
        );
    }

    return (
        <Dot
            cx={cx}
            cy={cy}
            r={4}
            fill="#8884d8"
            stroke="#fff"
            strokeWidth={2}
        />
    );
};

const VisitChart = ({ data }) => {
    const chartData = data || [];

    const formattedData = chartData.map(item => ({
        date: item.createdAt.split(' ')[0],
        visits: item.count
    }));

    // 날짜순으로 정렬 (최신이 오른쪽으로 가도록 오름차순 정렬)
    formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={formattedData}
                margin={{
                    top: 5, right: 20, left: -10, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                    contentStyle={{ backgroundColor: "#f5f5f5", borderColor: "#8884d8" }}
                    itemStyle={{ color: "#8884d8" }}
                    labelStyle={{ color: "#666" }}
                />
                <Legend verticalAlign="top" align="center" />
                <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={<CustomizedDot />}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default VisitChart;
