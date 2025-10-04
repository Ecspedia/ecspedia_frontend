"use client";
import { useState } from "react";
import Image from "next/image";

const tabs = [
  { name: "Stays", icon: "images/home/light__bed.svg" },
  { name: "Flights", icon: "images/home/light__flight.svg" },
  { name: "Cars", icon: "images/home/light__car.svg" },
  { name: "Packages", icon: "images/home/light__package.svg" },
  { name: "Things to do", icon: "images/home/light__ticket.svg" },
  { name: "Cruises", icon: "images/home/light__cruise.svg" },
];

export default function ServiceSelector() {
  const [selectedTab, setSelectedTab] = useState<string>("Stays");
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="flex flex-row gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={`flex flex-col items-center border-b-4 border-transparent  ${
            selectedTab === tab.name
              ? "hover:border-b-secondary border-b-secondary scale-105"
              : "hover:border-b-primary"
          }`}
        >
          <Image
            src={tab.icon}
            alt={tab.name}
            width={48}
            height={48}
            className={`mb-2 transition-transform duration-300 ${
              selectedTab === tab.name ? "scale-110" : ""
            }`}
          />
          <div
            className={`mt-1 ${
              selectedTab === tab.name ? "text-secondary" : "text-primary"
            }`}
          >
            {tab.name}
          </div>
        </button>
      ))}
    </div>
  );
}
