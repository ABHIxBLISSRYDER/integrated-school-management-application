"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Type definitions for selected calendar value
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  // State to manage the selected date
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    // When a new date is selected, update the URL query string
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
