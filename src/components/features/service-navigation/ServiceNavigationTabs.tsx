"use client";

import { SERVICE_TABS, UI_DIMENSIONS, ANIMATION_DURATION } from "@/constants";
import ServiceNavigationTab from "./ServiceNavigationTab";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { setService } from "@/libs/features/service-navigation/serviceTabSlice";
import { useEffect, useState } from "react";

export default function ServiceNavigationTabs() {
  const dispatch = useAppDispatch();
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );
  const selectedIndex = SERVICE_TABS.findIndex(
    (tab) => tab.name === currentServiceTabSelected,
  );
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), ANIMATION_DURATION.TAB_TRANSITION);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  return (
    <ul className="relative flex pt-3">
      {SERVICE_TABS.map((tab) => (
        <ServiceNavigationTab
          key={tab.name}
          tab={tab}
          isSelected={currentServiceTabSelected === tab.name}
          onClick={() => dispatch(setService(tab.name))}
        ></ServiceNavigationTab>
      ))}
      <span
        className={`bg-secondary absolute bottom-0 transition-all duration-300 ease-in-out ${
          animate ? "h-[4px]" : "h-[2px]"
        }`}
        style={{
          left: `${selectedIndex * UI_DIMENSIONS.TAB_WIDTH_PX}px`,
          width: `${UI_DIMENSIONS.TAB_WIDTH_PX}px`,
        }}
      />
    </ul>
  );
}
