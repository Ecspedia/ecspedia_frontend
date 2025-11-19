import type { ServiceTab } from '@/types';
import { ServiceType } from '@/types';
import darkBedIcon from '../assets/dark__bed.svg';
import darkCarIcon from '../assets/dark__car.svg';
import darkCruiseIcon from '../assets/dark__cruise.svg';
import darkFlightIcon from '../assets/dark__flight.svg';
import darkPackageIcon from '../assets/dark__package.svg';
import darkTicketIcon from '../assets/dark__ticket.svg';
import lightBedIcon from '../assets/light__bed.svg';
import lightCarIcon from '../assets/light__car.svg';
import lightCruiseIcon from '../assets/light__cruise.svg';
import lightFlightIcon from '../assets/light__flight.svg';
import lightPackageIcon from '../assets/light__package.svg';
import lightTicketIcon from '../assets/light__ticket.svg';

export const SERVICE_TABS: ServiceTab[] = [
  {
    name: ServiceType.STAYS,
    icon: lightBedIcon,
    iconDark: darkBedIcon,
    index: 0,
  },
  {
    name: ServiceType.FLIGHTS,
    icon: lightFlightIcon,
    iconDark: darkFlightIcon,
    index: 1,
  },
  {
    name: ServiceType.CARS,
    icon: lightCarIcon,
    iconDark: darkCarIcon,
    index: 2,
    comingSoon: true,
  },
  {
    name: ServiceType.PACKAGES,
    icon: lightPackageIcon,
    iconDark: darkPackageIcon,
    index: 3,
    comingSoon: true,
  },
  {
    name: ServiceType.THINGS_TO_DO,
    icon: lightTicketIcon,
    iconDark: darkTicketIcon,
    index: 4,
    comingSoon: true,
  },
  {
    name: ServiceType.CRUISES,
    icon: lightCruiseIcon,
    iconDark: darkCruiseIcon,
    index: 5,
    comingSoon: true,
  },
];

// Service selector tab dimensions
export const UI_DIMENSIONS = {
  TAB_WIDTH_PX: 110,
} as const;
