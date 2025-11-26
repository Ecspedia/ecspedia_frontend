'use client';

import { usePathname } from 'next/navigation';

interface ConditionalHeaderProps {
  children: React.ReactNode;
}

export default function ConditionalHeader(conditionalHeaderProps: ConditionalHeaderProps) {
  const { children } = conditionalHeaderProps;
  const pathname = usePathname();

  // Pages that should not show the header
  const noHeaderPages = ['/map', '/booking', '/fullscreen', '/test'];

  if (noHeaderPages.includes(pathname)) {
    return <></>;
  }

  return <>{children}</>;
}

