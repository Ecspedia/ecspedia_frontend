import { ServiceTab } from "@/types/services";
import Image from "next/image";

interface TabButtonProps {
  tab: ServiceTab;
  isSelected: boolean;
  onClick: (name: string) => void;
}

export default function ServiceNavigationTab(tabButtonProps: TabButtonProps) {
  const { tab, isSelected, onClick } = tabButtonProps;
  return (
    <button
      key={tab.name}
      onClick={() => onClick(tab.name)}
      className={`flex flex-col items-center border-b-4 border-transparent ${
        isSelected
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
          isSelected ? "scale-110" : ""
        }`}
      />
      <div className={`mt-1 ${isSelected ? "text-secondary" : "text-primary"}`}>
        {tab.name}
      </div>
    </button>
  );
}
