export default function WeekdayHeader() {
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div className="grid w-full grid-cols-7">
      {dayNames.map((day, index) => (
        <div key={index} className="text-center font-medium">
          {day}
        </div>
      ))}
    </div>
  );
}
