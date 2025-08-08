import prisma from "@/lib/prisma";

// This server component fetches and displays the attendance percentage of a student
const StudentAttendanceCard = async ({ id }: { id: string }) => {
  // Fetch all attendance records for the given student from the start of the current year
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Jan 1 of current year
      },
    },
  });

  // Calculate total number of recorded days
  const totalDays = attendance.length;

  // Count how many of those days the student was present
  const presentDays = attendance.filter((day) => day.present).length;

  // Calculate attendance percentage
  const percentage = (presentDays / totalDays) * 100;

  return (
    <div className="">
      {/* Display attendance percentage or '-' if no records */}
      <h1 className="text-xl font-semibold">
        {percentage ? percentage.toFixed(1) : "-"}%
      </h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
