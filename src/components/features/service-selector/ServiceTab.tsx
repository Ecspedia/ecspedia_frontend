import { UI_DIMENSIONS } from '@/constants';
import { cn } from '@/lib/utils';
import { ServiceTab as ServiceTabType } from '@/types';
import Image from 'next/image';

interface TabButtonProps {
  tab: ServiceTabType;
  isSelected: boolean;
  onClick: (name: string) => void;
}

export default function ServiceTab(tabButtonProps: TabButtonProps) {
  const { tab, isSelected, onClick } = tabButtonProps;
  return (
    <li
      onClick={() => !tab.comingSoon && onClick(tab.name)}
      className={cn(
        'box-border flex pb-3',
        isSelected ? 'hover:border-b-secondary border-b-secondary' : 'hover:border-b-primary',
        tab.comingSoon ? 'cursor-not-allowed opacity-60' : ''
      )}
      style={{ width: `${UI_DIMENSIONS.TAB_WIDTH_PX}px` }}
    >
      <div
        key={tab.name}
        className={cn(
          'mx-auto mt-auto flex flex-col items-center',
          tab.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <div className="relative inline-block">
          <ServiceImage tab={tab}></ServiceImage>
          <CommingSoonBadge comingSoon={tab.comingSoon} />
        </div>
        <ServiceText isSelected={isSelected} tab={tab} />
      </div>
    </li>
  );
}

const ServiceImage = function ServiceImage({ tab }: { tab: ServiceTabType }) {
  return <Image src={tab.icon} alt={tab.name} width={48} height={48} className={`mb-2`} />;
};

const CommingSoonBadge = ({ comingSoon }: { comingSoon: boolean | undefined }) => {
  if (!comingSoon) return null;

  return (
    <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-1.5 py-1 shadow-md ring-1 ring-white">
      <span className="text-[7px] leading-none font-bold tracking-tight text-white uppercase">
        Soon
      </span>
    </div>
  );
};

const ServiceText = function ServiceText({
  isSelected,
  tab,
}: {
  isSelected: boolean;
  tab: ServiceTabType;
}) {
  return (
    <div
      className={cn('mt-1 text-center font-medium', isSelected ? 'text-secondary' : 'text-primary')}
    >
      {tab.name}
    </div>
  );
};
