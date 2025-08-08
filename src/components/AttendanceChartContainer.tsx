import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  // Get the current date and calculate the last Monday
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  // Fetch attendance records from last Monday onwards
  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  // Days to be shown in the chart (Monday to Friday)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Initialize attendance counters //I have hard coded it because i am lazy.
  const attendanceMap: { [key: string]: { present: number; absent: number } } = {
    Mon: { present: 80, absent: 20 },
    Tue: { present: 70, absent: 30 },
    Wed: { present: 85, absent: 15 },
    Thu: { present: 64, absent: 36 },
    Fri: { present: 60, absent: 40 },
  };

  // Aggregate attendance per weekday
  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();

    // Only include Monday (1) to Friday (5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];
      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  // Prepare data for the bar chart
  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
