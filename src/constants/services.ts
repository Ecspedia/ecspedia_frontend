import { ServiceTab, ServiceType } from "@/types";

export const SERVICE_TABS: ServiceTab[] = [
  {
    name: ServiceType.STAYS,
    icon: "images/home/light__bed.svg",
    iconDark: "images/home/dark__bed.svg",
    iconSelectedLight: "images/home/selected-light__bed.svg",
    iconSelectedDark: "images/home/selected-dark__bed.svg",
    index: 0
  },
  {
    name: ServiceType.FLIGHTS,
    icon: "images/home/light__flight.svg",
    iconDark: "images/home/dark__flight.svg",
    iconSelectedLight: "images/home/selected-light__flight.svg",
    iconSelectedDark: "images/home/selected-dark__flight.svg",
    index: 1,
  },
  {
    name: ServiceType.CARS,
    icon: "images/home/light__car.svg",
    iconDark: "images/home/dark__car.svg",
    iconSelected: "images/home/selected__car.svg",
    index: 2,
    comingSoon: true
  },
  {
    name: ServiceType.PACKAGES,
    icon: "images/home/light__package.svg",
    iconDark: "images/home/dark__package.svg",
    iconSelected: "images/home/selected__package.svg",
    index: 3,
    comingSoon: true,
  },
  {
    name: ServiceType.THINGS_TO_DO,
    icon: "images/home/light__ticket.svg",
    iconDark: "images/home/dark__ticket.svg",
    iconSelected: "images/home/selected__ticket.svg",
    index: 4,
    comingSoon: true,
  },
  {
    name: ServiceType.CRUISES,
    icon: "images/home/light__cruise.svg",
    iconDark: "images/home/dark__cruise.svg",
    iconSelected: "images/home/selected__cruise.svg",
    index: 5,
    comingSoon: true,
  },
];
