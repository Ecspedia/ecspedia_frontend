import Spinner from '@/components/ui/Spinner/Spinner';
import { useDarkMode } from '@/hooks';
import type { ServiceTab as ServiceTabType } from '@/types';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { UI_DIMENSIONS } from '../types/constants';

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
        'box-border flex pb-3  duration-200',
        isSelected
          ? 'border-b-secondary'
          : '',
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
          <ServiceImage tab={tab} />
          <CommingSoonBadge comingSoon={tab.comingSoon} />
        </div>
        <ServiceText isSelected={isSelected} tab={tab} />
      </div>
    </li>
  );
}

const ServiceImage = function ServiceImage({ tab }: { tab: ServiceTabType }) {
  const isDarkMode = useDarkMode();

  if (isDarkMode === undefined) {
    return (
      <div className="mb-2 flex h-12 w-12 items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  const iconSrc = isDarkMode ? tab.iconDark : tab.icon;
  return <Image src={iconSrc} alt={`${tab.name} service`} width={48} height={48} className="mb-2" />;
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
