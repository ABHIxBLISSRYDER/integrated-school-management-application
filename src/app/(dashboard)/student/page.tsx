import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  // Get the currently authenticated user's ID (Clerk)
  const { userId } = auth();

  // Find the class(es) that the student is enrolled in
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } }, // Find class with the student ID
    },
  });

  // TEMP: Log the result for debugging purposes
  console.log(classItem);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT SECTION: Class Schedule */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">
            Schedule ({classItem[0]?.name || "N/A"})
          </h1>

          {/* Display calendar if class found, otherwise fallback message */}
          {classItem.length > 0 ? (
            <BigCalendarContainer type="classId" id={classItem[0].id} />
          ) : (
            <div>No classes found for this student.</div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION: Upcoming Events and Announcements */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
