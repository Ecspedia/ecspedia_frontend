'use client';
import { useServiceSelector } from '@/features/service-selector/hooks';
import {
  selectService,
  setService,
} from '@/features/service-selector/store/serviceSelectorSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { SERVICE_TABS, UI_DIMENSIONS } from '../types/constants';
import ServiceNavigationTab from './ServiceTab';

export default function ServiceTabSelector() {
  const dispatch = useAppDispatch();
  const currentServiceTabSelected = useAppSelector(selectService);
  const { animate, selectedIndex } = useServiceSelector({
    currentServiceTabSelected: currentServiceTabSelected,
  });

  return (
    <ul className="relative flex flex-nowrap pt-4 mx-auto w-fit">
      {SERVICE_TABS.map((tab) => (
        <ServiceNavigationTab
          key={tab.name}
          tab={tab}
          isSelected={currentServiceTabSelected === tab.name}
          onClick={() => dispatch(setService(tab.name))}
        />
      ))}
      <li role="presentation" aria-hidden className="list-none">
        <TabUnderline animate={animate} selectedIndex={selectedIndex} />
      </li>
    </ul>
  );
}

const TabUnderline = ({ animate, selectedIndex }: { animate: boolean; selectedIndex: number }) => {
  return (
    <span
      className={`bg-brand-secondary absolute bottom-0 transition-all duration-300 ease-in-out ${animate ? 'h-1' : 'h-0.5'
        }`}
      style={{
        left: `${selectedIndex * UI_DIMENSIONS.TAB_WIDTH_PX}px`,
        width: `${UI_DIMENSIONS.TAB_WIDTH_PX}px`,
      }}
    />
  );
};
