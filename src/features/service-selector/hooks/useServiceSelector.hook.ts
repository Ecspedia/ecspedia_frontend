import { ANIMATION_DURATION } from '@/config';
import { ServiceType } from '@/types/global';
import { useEffect, useState } from 'react';
import { SERVICE_TABS } from '../types/constants';

interface UseServiceSelectorProps {
  currentServiceTabSelected: ServiceType;
}

export default function useServiceSelector(useServiceSelectorProps: UseServiceSelectorProps) {
  const { currentServiceTabSelected } = useServiceSelectorProps;
  const [animate, setAnimate] = useState(false);
  const selectedIndex = SERVICE_TABS.findIndex((tab) => tab.name === currentServiceTabSelected);
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), ANIMATION_DURATION.TAB_TRANSITION);
    return () => clearTimeout(timer);
  }, [selectedIndex]);
  return { animate, selectedIndex };
}
