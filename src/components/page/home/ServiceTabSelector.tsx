"use client";
import { useState } from "react";
import { SERVICE_TABS } from "@/constants/services";
import TabButton from "./TabButton";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { setService } from "@/libs/features/serviceTab/serviceTabSlice";

export default function ServiceTabSelector() {
  const dispatch = useAppDispatch();
  const currentServiceTabSelected = useAppSelector(
    (state) => state.serviceTab.selectedService,
  );

  return (
    <div className="flex gap-8">
      {SERVICE_TABS.map((tab) => (
        <TabButton
          key={tab.name}
          tab={tab}
          isSelected={currentServiceTabSelected == tab.name}
          onClick={() => dispatch(setService(tab.name))}
        ></TabButton>
      ))}
    </div>
  );
}
