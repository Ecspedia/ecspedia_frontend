"use client";

import { useAppSelector } from "@/libs/hooks";
import ServiceSearchFlightForm from "./ServiceSearchFlightForm";

import { ServiceType } from "@/types/services";

export default function ServiceSearchForm() {
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );

  if (currentServiceTabSelected == ServiceType.FLIGHTS)
    return <ServiceSearchFlightForm></ServiceSearchFlightForm>;
  return <div className="h-30 w-full"></div>;
}
