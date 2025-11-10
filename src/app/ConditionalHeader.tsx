'use client';

import { usePathname } from 'next/navigation';
import { HeaderNav } from '@/components/shared/Header';

export default function ConditionalHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages that should not show the header
  const noHeaderPages = ['/map'];

  if (noHeaderPages.includes(pathname)) {
    return <>{children}</>;
  }

  return <HeaderNav>{children}</HeaderNav>;
}

