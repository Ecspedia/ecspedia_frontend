"use client";

import { useAppSelector } from "@/libs/hooks";

import { ServiceType } from "@/types";
import { SearchHotelForm } from "@/components/features/hotel";
import { ServiceSearchFlightForm } from "@/components/features/flight";

export default function ServiceSearchForm() {
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );

  if (currentServiceTabSelected === ServiceType.FLIGHTS)
    return <ServiceSearchFlightForm></ServiceSearchFlightForm>;
  if (currentServiceTabSelected === ServiceType.STAYS)
    return <SearchHotelForm></SearchHotelForm>;
  return <div className="h-30 w-full"></div>;
}
