export interface ServiceTab {
  name: string;
  icon: string;
  iconDark: string;
  iconSelected?: string;
  iconSelectedLight?: string;
  iconSelectedDark?: string;
  index: number;
  comingSoon?: boolean;
}

export enum ServiceType {
  STAYS = "Stays",
  FLIGHTS = "Flights",
  CARS = "Cars",
  PACKAGES = "Packages",
  THINGS_TO_DO = "Things to do",
  CRUISES = "Cruises",
}
