import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  // Use the provided date or fallback to today's date
  const date = dateParam ? new Date(dateParam) : new Date();

  // Fetch all events for the selected day (from 00:00 to 23:59)
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  // Render a styled card for each event
  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-Sky even:border-t-Purple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        {/* Event title */}
        <h1 className="font-semibold text-gray-600">{event.title}</h1>

        {/* Event start time formatted to HH:mm (24-hour clock) */}
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>

      {/* Event description */}
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
