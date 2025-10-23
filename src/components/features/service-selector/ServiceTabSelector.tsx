'use client';
import { SERVICE_TABS, UI_DIMENSIONS } from '@/constants';
import ServiceNavigationTab from './ServiceTab';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  selectService,
  setService,
} from '@/components/features/service-selector/store/serviceSelectorSlice';
import { useServiceSelector } from '@/components/features/service-selector/hooks';

export default function ServiceTabSelector() {
  const dispatch = useAppDispatch();
  const currentServiceTabSelected = useAppSelector(selectService);
  const { animate, selectedIndex } = useServiceSelector({
    currentServiceTabSelected: currentServiceTabSelected,
  });

  return (
    <ul className="relative flex pt-3">
      {SERVICE_TABS.map((tab) => (
        <ServiceNavigationTab
          key={tab.name}
          tab={tab}
          isSelected={currentServiceTabSelected === tab.name}
          onClick={() => dispatch(setService(tab.name))}
        ></ServiceNavigationTab>
      ))}
      <TabUnderline animate={animate} selectedIndex={selectedIndex} />
    </ul>
  );
}

const TabUnderline = ({ animate, selectedIndex }: { animate: boolean; selectedIndex: number }) => {
  return (
    <span
      className={`bg-secondary absolute bottom-0 transition-all duration-300 ease-in-out ${
        animate ? 'h-1' : 'h-0.5'
      }`}
      style={{
        left: `${selectedIndex * UI_DIMENSIONS.TAB_WIDTH_PX}px`,
        width: `${UI_DIMENSIONS.TAB_WIDTH_PX}px`,
      }}
    />
  );
};
