'use client';

import { usePathname } from 'next/navigation';

interface ConditionalRenderingProps {
    children: React.ReactNode;
    noRenderingPages: string[];
}

export default function ConditionalRendering(conditionalRenderingProps: ConditionalRenderingProps) {
    const { children, noRenderingPages } = conditionalRenderingProps;
    const pathname = usePathname();
    if (noRenderingPages.includes(pathname)) {
        return <></>;
    }

    return <>{children}</>;
}
