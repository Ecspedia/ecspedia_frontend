import { ServiceTab, ServiceType } from "@/types";

export const SERVICE_TABS: ServiceTab[] = [
  { name: ServiceType.STAYS, icon: "images/home/light__bed.svg", index: 0 },
  {
    name: ServiceType.FLIGHTS,
    icon: "images/home/light__flight.svg",
    index: 1,
  },
  { name: ServiceType.CARS, icon: "images/home/light__car.svg", index: 2, comingSoon: true },
  {
    name: ServiceType.PACKAGES,
    icon: "images/home/light__package.svg",
    index: 3,
    comingSoon: true,
  },
  {
    name: ServiceType.THINGS_TO_DO,
    icon: "images/home/light__ticket.svg",
    index: 4,
    comingSoon: true,
  },
  {
    name: ServiceType.CRUISES,
    icon: "images/home/light__cruise.svg",
    index: 5,
    comingSoon: true,
  },
];
