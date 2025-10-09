"use client";

import { SERVICE_TABS } from "@/constants/services";
import ServiceNavigationTab from "./ServiceNavigationTab";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { setService } from "@/libs/features/serviceTab/serviceTabSlice";

export default function ServiceNavigationTabs() {
  const dispatch = useAppDispatch();
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );

  return (
    <div className="flex gap-8">
      {SERVICE_TABS.map((tab) => (
        <ServiceNavigationTab
          key={tab.name}
          tab={tab}
          isSelected={currentServiceTabSelected == tab.name}
          onClick={() => dispatch(setService(tab.name))}
        ></ServiceNavigationTab>
      ))}
    </div>
  );
}
