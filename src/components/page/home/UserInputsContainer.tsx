"use client";

import { useAppSelector } from "@/libs/hooks";
import FlightContainer from "./FlightsContainer";
import { SERVICE_TABS } from "@/constants/services";

export default function UserInputsContainer() {
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );
  const isFlightTab = SERVICE_TABS.find(
    (serviceTab) => serviceTab.name === "Flights",
  )!.name;

  if (currentServiceTabSelected == isFlightTab)
    return <FlightContainer></FlightContainer>;
  return <></>;
}
