export type DarkModeState = boolean | undefined;

export type Axis = 'horizontal' | 'vertical';

export interface ServiceTab {
  name: string;
  icon: string;
  iconDark: string;
  index: number;
  comingSoon?: boolean;
}

export enum ServiceType {
  STAYS = 'Stays',
  FLIGHTS = 'Flights',
  CARS = 'Cars',
  PACKAGES = 'Packages',
  THINGS_TO_DO = 'Things to do',
  CRUISES = 'Cruises',
}

export type Flight = {
  id: number;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  arrivalTime: string;
  company: string;
  price: number;
  totalTime: string;
  image: string;
};
