"use client";
import { useState } from "react";

import { SERVICE_TABS } from "@/constants/services";
import TabButton from "./TabButton";

export default function ServiceTabSelector() {
  const [selectedTab, setSelectedTab] = useState<string>("Stays");
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="flex gap-8">
      {SERVICE_TABS.map((tab) => (
        <TabButton
          key={tab.name}
          tab={tab}
          isSelected={selectedTab == tab.name}
          onClick={() => handleTabClick(tab.name)}
        ></TabButton>
      ))}
    </div>
  );
}
