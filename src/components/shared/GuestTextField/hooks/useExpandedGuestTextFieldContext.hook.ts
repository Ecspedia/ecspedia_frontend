import { useContext } from 'react';
import { GuestSelectorContext } from '../utils/types';

export default function useGuestSelectorContext() {
  const context = useContext(GuestSelectorContext);
  if (!context) {
    throw new Error('useGuestSelectorContext must be used within GuestSelector');
  }
  return context;
}
