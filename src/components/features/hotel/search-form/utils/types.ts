export enum LocationFieldType {
  LOCATION = 'location',
  STARTDATECALENDAR = 'startDateCalendar',
  ENDDATECALENDAR = 'endDateCalendar',
  ADULTS = 'adults',
}

export interface HotelFormInput {
  location: string;
  startDate: string | null;
  endDate: string | null;
  adults: number;
}
