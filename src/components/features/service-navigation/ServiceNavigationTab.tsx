import { ServiceTab } from '@/types';
import Image from 'next/image';

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
        isSelected ? 'hover:border-b-secondary border-b-secondary' : 'hover:border-b-primary'
      }`}
    >
      <div key={tab.name} className="mx-auto mt-auto cursor-pointer">
        <div className="relative inline-block">
          <Image
            src={tab.icon}
            alt={tab.name}
            width={48}
            height={48}
            className={`mx-auto mt-auto mb-2 ${isSelected ? '' : ''}`}
          />
          {tab.comingSoon && (
            <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-1.5 py-1 shadow-md ring-1 ring-white">
              <span className="text-[7px] leading-none font-bold tracking-tight text-white uppercase">
                Soon
              </span>
            </div>
          )}
        </div>
        <div
          className={`mt-1 text-center font-medium ${isSelected ? 'text-secondary' : 'text-primary'}`}
        >
          {tab.name}
        </div>
      </div>
    </li>
  );
}
