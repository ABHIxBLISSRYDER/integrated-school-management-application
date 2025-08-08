import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  // Extract the selected date from URL query parameters
  const { date } = searchParams;

  return (
    <div className="bg-white p-4 rounded-md">
      {/* Interactive calendar component */}
      <EventCalendar />

      {/* Header section */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Display list of events for the selected date */}
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
