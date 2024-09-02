import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];  // YYYY-MM-DD 형식으로 포맷팅
}

function ReservationsChart({ data }) {
    if (!data || !data.reservationDetails) return null;

    const formattedData = data.reservationDetails.map(item => ({
        ...item,
        reservestart: formatDate(item.reservestart)
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="reservestart" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="payment" stroke="#8884d8" name="결제 금액" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ReservationsChart;
