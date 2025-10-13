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
    <li
      onClick={() => onClick(tab.name)}
      className={`box-border flex w-[110px] pb-3 ${
        isSelected
          ? "hover:border-b-secondary border-b-secondary"
          : "hover:border-b-primary"
      }`}
    >
      <div key={tab.name} className="mx-auto mt-auto cursor-pointer">
        <Image
          src={tab.icon}
          alt={tab.name}
          width={48}
          height={48}
          className={`mx-auto mt-auto mb-2 ${isSelected ? "" : ""}`}
        />
        <div
          className={`mt-1 text-center font-medium ${isSelected ? "text-secondary" : "text-primary"}`}
        >
          {tab.name}
        </div>
      </div>
    </li>
  );
}
