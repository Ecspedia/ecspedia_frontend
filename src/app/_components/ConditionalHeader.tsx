'use client';

import { usePathname } from 'next/navigation';
import { HeaderNav } from '@/components/shared/Header';

interface ConditionalHeaderProps {
  children: React.ReactNode;
}

export default function ConditionalHeader(conditionalHeaderProps: ConditionalHeaderProps) {
  const { children } = conditionalHeaderProps;
  const pathname = usePathname();

  // Pages that should not show the header
  const noHeaderPages = ['/map', '/booking'];
  
  if (noHeaderPages.includes(pathname)) {
    return <>{children}</>;
  }
  
  return <HeaderNav>{children}</HeaderNav>;
}

