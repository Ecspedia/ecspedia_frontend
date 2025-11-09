import { SERVICE_TABS } from '../constants';
import { ANIMATION_DURATION } from '@/config';
import { ServiceType } from '@/types';
import { useEffect, useState } from 'react';

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
