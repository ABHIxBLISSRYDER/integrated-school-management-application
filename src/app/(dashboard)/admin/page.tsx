import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

/**
 * AdminPage - Dashboard view specifically for administrators.
 * Displays user type stats, visual charts, event calendar, and announcements.
 *
 * Props:
 * - searchParams: URL search parameters used by child components like EventCalendarContainer
 */
const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT SECTION: Main content column (charts + cards) */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        
        {/* USER CARDS: Display counts or summary for each user type */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>

        {/* MIDDLE CHARTS: Count chart + Attendance chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count chart (e.g., user stats, class counts) */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>

          {/* Attendance chart (e.g., daily or monthly attendance trends) */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>

        {/* FINANCIAL CHART: Displays revenue/expenses/fees etc. */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT SECTION: Calendar and Announcements */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/* Event Calendar with optional filters from searchParams */}
        <EventCalendarContainer searchParams={searchParams} />

        {/* Announcement feed for admins */}
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
