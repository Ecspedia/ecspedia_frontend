export interface ServiceTab {
  name: string;
  icon: string;
  index: number;
}

export enum ServiceType {
  STAYS = "Stays",
  FLIGHTS = "Flights",
  CARS = "Cars",
  PACKAGES = "Packages",
  THINGS_TO_DO = "Things to do",
  CRUISES = "Cruises",
}
