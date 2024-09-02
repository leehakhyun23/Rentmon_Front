import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SalesChart({ data }) {
    if (!data || !data.spaceSalesDataList) return null;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.spaceSalesDataList}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="spaceTitle" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalSales" stroke="#8884d8" name="총 매출액" />
                <Line type="monotone" dataKey="totalReservations" stroke="#82ca9d" name="총 예약 건수" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default SalesChart;