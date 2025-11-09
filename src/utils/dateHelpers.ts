export class DateHelper {
  private static readonly monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  static isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  static addOneDay(date: Date): Date {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, 0);
    return newDate;
  }
  static addOneMonth(date: Date): Date {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0, 0);
    return newDate;
  }

  static pastTomorrow(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  static getDaysDifference(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / oneDay);
  }

  static getMonthName(date: Date): string {
    return `${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  static formatDate(date: Date | null): string {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  static formatDateMonthDay(date: Date | null): string {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  static normalizeDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }

  static isToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date.toDateString() === today.toDateString();
  }
  static getToday(): Date {
    const today = new Date();
    return this.normalizeDate(today);
  }
  static isLessThanToday(dateToCheck: Date): boolean {
    const today = this.getToday();
    dateToCheck = this.normalizeDate(dateToCheck);
    return dateToCheck < today;
  }

  static isDateEqual(date1: Date | null, date2: Date): boolean {
    if (!date1) return false;
    return date1.toDateString() === date2.toDateString();
  }

  static isInRange(date: Date, startDate: Date | null, endDate: Date | null): boolean {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  }

  static getDaysInMonth(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }
}
