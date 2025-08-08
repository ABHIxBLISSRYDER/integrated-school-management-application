"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
    // Makes the chart responsive to parent container
    <ResponsiveContainer width="100%" height="90%">
      <BarChart width={500} height={300} data={data} barSize={20}>
        {/* Grid lines for better readability */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />

        {/* X-Axis configuration */}
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />

        {/* Y-Axis configuration */}
        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />

        {/* Tooltip for interactive hover data */}
        <Tooltip
          contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
        />

        {/* Legend placement and spacing */}
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
        />

        {/* Bar representing 'present' attendance */}
        <Bar
          dataKey="present"
          fill="#BBF7D0"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />

        {/* Bar representing 'absent' attendance */}
        <Bar
          dataKey="absent"
          fill="#FCA5A5"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
