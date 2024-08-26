import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#A28EFF", "#FF6B8A", "#3D85C6", "#76D7C4",
  "#D4AC0D", "#7D3C98", "#28B463", "#E74C3C"
];

const CategoryPieChart = ({ data }) => {
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default CategoryPieChart;