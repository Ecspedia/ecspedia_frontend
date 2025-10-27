import { UI_DIMENSIONS } from '@/constants';
import { cn } from '@/lib/utils';
import { ServiceTab as ServiceTabType } from '@/types';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '@/components/features/dark-mode';

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
          <ServiceImage tab={tab} isSelected={isSelected}></ServiceImage>
          <CommingSoonBadge comingSoon={tab.comingSoon} />
        </div>
        <ServiceText isSelected={isSelected} tab={tab} />
      </div>
    </li>
  );
}

const ServiceImage = function ServiceImage({ tab, isSelected }: { tab: ServiceTabType; isSelected: boolean }) {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const iconSrc = isDarkMode ? tab.iconDark : tab.icon;

  return <Image src={iconSrc} alt={tab.name} width={48} height={48} className={`mb-2`} />;
};

const CommingSoonBadge = ({ comingSoon }: { comingSoon: boolean | undefined }) => {
  if (!comingSoon) return null;

  return (
    <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) px-1.5 py-1 shadow-md">
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
      className={cn(
        'mt-1 text-center font-medium',
        isSelected ? 'text-brand-secondary' : 'text-primary'
      )}
    >
      {tab.name}
    </div>
  );
};
