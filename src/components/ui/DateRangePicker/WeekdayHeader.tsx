export default function WeekdayHeader() {
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 40px)' }}>
      {dayNames.map((day, index) => (
        <div key={index} className="text-center font-medium">
          {day}
        </div>
      ))}
    </div>
  );
}
