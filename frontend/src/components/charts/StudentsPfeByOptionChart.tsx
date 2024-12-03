import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StudentsPfeByOptionProps {
  data: { option: string; students: number; proposals: number }[];
}

export const StudentsPfeByOptionChart: React.FC<StudentsPfeByOptionProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="students" fill="#8884d8" name="Students" />
        <Bar dataKey="proposals" fill="#82ca9d" name="PFE Proposals" />
      </BarChart>
    </ResponsiveContainer>
  );
};

