import { useState } from "react";
import Button from "./Button";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Day names
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const numberOfDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  const spaceToAddAtfirts = Array.from({ length: firstDay }, (_, i) => i + 1);

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!startDate) return false;
    if (!endDate) return false;
    return (
      (day === startDate.getDate() &&
        month === startDate.getMonth() &&
        year === startDate.getFullYear()) ||
      (day === endDate.getDate() &&
        month === endDate.getMonth() &&
        year === endDate.getFullYear())
    );
  };

  const isOnDateRange = (day: number) => {
    if (!startDate || !endDate) return false;

    const currentDay = new Date(year, month, day);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure start is before end
    const [minDate, maxDate] = start < end ? [start, end] : [end, start];

    return currentDay > minDate && currentDay < maxDate;
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    const newEndDate = new Date(year, month, day + 1);
    //First scenario both are null
    if (startDate === null && endDate === null) {
      setStartDate(clickedDate);
      setEndDate(newEndDate);
      return;
    }

    //Second scenario deselect current selection
    if (clickedDate.getTime() === startDate!.getTime()) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    //Third Scenario select a range
    if (startDate !== null) {
      setEndDate(clickedDate);
    }
  };

  const renderDay = (day: number) => {
    const selected = isSelected(day);
    const inRange = isOnDateRange(day);
    const today = isToday(day);

    let dayElement;

    if (selected) {
      const isStartDate =
        startDate &&
        day === startDate.getDate() &&
        month === startDate.getMonth() &&
        year === startDate.getFullYear();

      const isEndDate =
        endDate &&
        day === endDate.getDate() &&
        month === endDate.getMonth() &&
        year === endDate.getFullYear();

      const getCorrectAngle = startDate!.getTime() < endDate!.getTime();

      dayElement = (
        <div key={day} className="relative">
          {/* Background extends right for start date, left for end date.*/}
          <div
            className={`absolute h-full bg-blue-500/15 ${
              isStartDate
                ? getCorrectAngle
                  ? "right-0 left-1/2"
                  : "right-1/2 left-0"
                : ""
            } ${
              isEndDate
                ? getCorrectAngle
                  ? "right-1/2 left-0"
                  : "right-0 left-1/2"
                : ""
            }${isStartDate && isEndDate ? "right-1/2 left-1/2" : ""}`}
          ></div>
          <div
            className="absolute left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-blue-500 p-2 text-center text-white hover:border-2 hover:border-black hover:bg-blue-600"
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        </div>
      );
    } else if (inRange) {
      dayElement = (
        <div key={day} className="relative">
          <div className="absolute inset-0 z-0 bg-blue-500/15"></div>
          <div
            className="relative z-10 mx-auto h-10 w-10 rounded-full p-2 text-center hover:border"
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        </div>
      );
    } else {
      dayElement = (
        <div key={day} className="mx-auto">
          <div
            className={`h-10 w-10 rounded-full p-2 text-center text-gray-900 hover:border ${
              today ? "bg-secondary scale-75 text-white" : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        </div>
      );
    }

    return dayElement;
  };

  return (
    <div className="absolute top-0 z-2 w-80 shadow-lg">
      <div className="top-0 left-0 bg-white p-2 focus:border-transparent">
        <div className="flex items-center p-4">
          {startDate &&
            new Date(startDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          <ArrowRightIcon className="mx-2 h-5 w-5" />

          {endDate &&
            new Date(endDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
        </div>
        <div className="flex justify-between">
          <button className="w-8 cursor-pointer p-2" onClick={prevMonth}>
            <ChevronLeftIcon></ChevronLeftIcon>
          </button>
          <div className="text-lg font-semibold">
            {monthNames[month]} {year}
          </div>
          <button className="w-8 cursor-pointer p-2" onClick={nextMonth}>
            <ChevronRightIcon></ChevronRightIcon>
          </button>
        </div>
        <div className="grid grid-cols-7">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {spaceToAddAtfirts.map((day, index) => (
            <div key={`empty-${index}`} className=""></div>
          ))}
          {daysArray.map((day) => renderDay(day))}
        </div>
        <div className="flex h-10 justify-end">
          <Button text="Done"></Button>
        </div>
      </div>
    </div>
  );
}
