"use client";
import FlightCardList from "@/components/features/flight/FlightCardList";
import ServiceNavigationTabs from "@/components/features/service-navigation/ServiceNavigationTabs";

import ServiceSearchForm from "@/components/features/service-navigation/ServiceSearchForm";

import { HotelCardList } from "@/components/features/hotel";
import { useAppSelector } from "@/libs/hooks";
import { ServiceType } from "@/types/services";

export default function Home() {
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );
  const currentServiceTabHtml = () => {
    if (currentServiceTabSelected == ServiceType.FLIGHTS)
      return (
        <div className="mt-5">
          <FlightCardList />
        </div>
      );
    if (currentServiceTabSelected == ServiceType.STAYS)
      return (
        <div className="mt-5">
          <HotelCardList />
        </div>
      );
    else return <div></div>;
  };

  return (
    <div>
      <div className="mx-auto w-3/5">
        <div className="border-primary mt-10 flex flex-col rounded-lg border-1">
          <div className="mx-auto">
            <ServiceNavigationTabs></ServiceNavigationTabs>
          </div>
          <hr className="border-primary w-full border-t-1" />
          <ServiceSearchForm />
        </div>
        {currentServiceTabHtml()}
      </div>
    </div>
  );
}
/**/
