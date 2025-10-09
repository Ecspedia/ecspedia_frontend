import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Button from "./Button";

interface SimpleCalendarProps {
  onClose?: () => void;
  onChange: (date: Date) => void;
  value: Date | null;
}

export default function SimpleCalendar(
  simpleCalendarProps: SimpleCalendarProps,
) {
  const { onClose, onChange, value } = simpleCalendarProps;

  const [dateHelper, setDateHelper] = useState(new Date());

  const selectedDate = value;

  const currentYear = dateHelper.getFullYear();
  const currentMonth = dateHelper.getMonth();
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthToString = monthNames[currentMonth];

  const prevMonth = () => {
    setDateHelper(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setDateHelper(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    onChange(date);
  };
  const getDaysInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };
  const isSelected = (day: number) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };
  const renderDay = (day: number | null, index: number) => {
    if (!day) {
      return <div key={index} className="h-10"></div>;
    }

    return (
      <div
        key={index}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${day ? "hover:border" : ""} ${
          isToday(day)
            ? isSelected(day)
              ? "border-secondary border-8 bg-white text-black!"
              : "bg-secondary scale-75 text-white hover:border-2 hover:border-black"
            : ""
        } ${isSelected(day) ? "bg-secondary text-white hover:border hover:border-black" : ""} `}
        onClick={() =>
          handleDateClick(new Date(currentYear, currentMonth, day))
        }
      >
        {day}
      </div>
    );
  };

  return (
    <div className="absolute top-0 z-3 w-full bg-white shadow-lg">
      <div className="flex flex-col">
        <MonthNavigation
          monthName={currentMonthToString}
          year={currentYear}
          onPrev={prevMonth}
          onNext={nextMonth}
        />
        <DayTitles />
        <div className="grid grid-cols-7">
          {getDaysInMonth().map((day, index) => renderDay(day, index))}
        </div>
        <div className="flex h-10 justify-end">
          <Button onClick={onClose} text="Done"></Button>
        </div>
      </div>
    </div>
  );
}

function MonthNavigation({
  monthName,
  year,
  onPrev,
  onNext,
}: {
  monthName: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        className="w-8 cursor-pointer rounded p-2 hover:bg-gray-100"
        onClick={onPrev}
      >
        <ChevronLeftIcon />
      </button>
      <div className="text-lg font-semibold">
        {monthName} {year}
      </div>
      <button
        className="w-8 cursor-pointer rounded p-2 hover:bg-gray-100"
        onClick={onNext}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
function DayTitles() {
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="grid grid-cols-7">
      {dayNames.map((day, index) => (
        <div key={index} className="text-center font-medium">
          {day}
        </div>
      ))}
    </div>
  );
}
