"use client";

import { useAppSelector } from "@/libs/hooks";

import { ServiceType } from "@/types/services";
import { ServiceSearchHotelForm } from "@/components/features/hotel";
import { ServiceSearchFlightForm } from "@/components/features/flight";

export default function ServiceSearchForm() {
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );

  if (currentServiceTabSelected == ServiceType.FLIGHTS)
    return <ServiceSearchFlightForm></ServiceSearchFlightForm>;
  if (currentServiceTabSelected == ServiceType.STAYS)
    return <ServiceSearchHotelForm></ServiceSearchHotelForm>;
  return <div className="h-30 w-full"></div>;
}
