import { ServiceTab, ServiceType } from "@/types/services";

export const SERVICE_TABS: ServiceTab[] = [
  { name: ServiceType.STAYS, icon: "images/home/light__bed.svg" },
  { name: ServiceType.FLIGHTS, icon: "images/home/light__flight.svg" },
  { name: ServiceType.CARS, icon: "images/home/light__car.svg" },
  { name: ServiceType.PACKAGES, icon: "images/home/light__package.svg" },
  { name: ServiceType.THINGS_TO_DO, icon: "images/home/light__ticket.svg" },
  { name: ServiceType.CRUISES, icon: "images/home/light__cruise.svg" },
];
