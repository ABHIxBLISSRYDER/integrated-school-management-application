"use client";

import Image from "next/image";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

// Sample data for performance chart: Group A (92%) and Group B (8%)
const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" }, // Representing current performance
  { name: "Group B", value: 8, fill: "#FAE27C" },  // Representing remaining percentage
];

const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      {/* Header with title and more options icon */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="More Options" width={16} height={16} />
      </div>

      {/* Responsive pie chart container */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"        // Defines the data field to be visualized
            startAngle={180}       // Starts from the bottom
            endAngle={0}           // Draws semi-circle (half pie)
            data={data}            // Chart data
            cx="50%"               // Center X
            cy="50%"               // Center Y
            innerRadius={70}       // Creates donut chart
            fill="#8884d8"         // Default fill
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text inside the pie chart (visual summary) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-300">of 10 max LTS</p>
      </div>

      {/* Footer label below the chart */}
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">
        1st Semester - 2nd Semester
      </h2>
    </div>
  );
};

export default Performance;
