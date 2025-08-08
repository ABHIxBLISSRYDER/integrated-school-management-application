"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Initialize moment.js localizer for the calendar
const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  // State to control the current calendar view (e.g., work week or day)
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  // Update the view when user switches between available views
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}          // Handles date localization
      events={data}                  // Calendar events to display
      startAccessor="start"          // Field name for start date
      endAccessor="end"              // Field name for end date
      views={["work_week", "day"]}   // Allowed calendar views
      view={view}                    // Current view
      style={{ height: "98%" }}      // Full height usage
      onView={handleOnChangeView}    // Callback when view changes
      min={new Date(2025, 1, 0, 8, 0, 0)}   // Earliest visible time: 8 AM
      max={new Date(2025, 1, 0, 17, 0, 0)}  // Latest visible time: 5 PM
    />
  );
};

export default BigCalendar;
