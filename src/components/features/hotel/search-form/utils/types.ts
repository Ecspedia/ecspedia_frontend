export enum LocationFieldType {
  LOCATION = 'location',
  STARTDATECALENDAR = 'startDateCalendar',
  ENDDATECALENDAR = 'endDateCalendar',
}

export interface HotelFormInput {
  location: string;
  startDate: string | null;
  endDate: string | null;
}
