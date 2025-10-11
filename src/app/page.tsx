"use client";
import FlightCardList from "@/components/features/flight/FlightCardList";
import ServiceNavigationTabs from "@/components/features/service-navigation/ServiceNavigationTabs";

import ServiceSearchForm from "@/components/features/service-navigation/ServiceSearchForm";

import { useAppSelector } from "@/libs/hooks";
import { ServiceType } from "@/types/services";

export default function Home() {
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );

  return (
    <div>
      <div className="mx-auto w-3/5">
        <div className="border-primary mt-10 flex flex-col rounded-lg border-1">
          <div className="mx-auto mt-5">
            <ServiceNavigationTabs></ServiceNavigationTabs>
          </div>
          <hr className="border-primary w-full border-t-1" />
          <ServiceSearchForm />
        </div>
        {currentServiceTabSelected == ServiceType.FLIGHTS ? (
          <div className="mt-5">
            <FlightCardList />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
/**/
