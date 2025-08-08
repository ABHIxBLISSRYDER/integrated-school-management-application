import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * ParentPage - Dashboard view for parents.
 * Shows class schedules of all children (students) linked to the logged-in parent.
 * Also displays global announcements.
 */
const ParentPage = async () => {
  // Get current logged-in parent ID using Clerk authentication
  const { userId } = auth();
  const currentUserId = userId;

  // Fetch all student records where this parent is listed as the parentId
  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT SECTION: Displays each child's schedule */}
      <div className="">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              {/* Header with student's full name */}
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>

              {/* Calendar showing class schedule for this student's class */}
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SECTION: Global announcements for parents */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
