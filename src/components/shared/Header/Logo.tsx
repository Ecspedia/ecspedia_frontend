import Image from 'next/image';
import Link from 'next/link';

import { paths } from '@/config/paths';

export default function Logo() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Ecspedia Dev';

  return (
    <div className="flex items-center space-x-4">
      <Link href={paths.home.getHref()} className="flex items-center gap-2">
        <Image src="/favicon.ico" alt="" width={24} height={24} className="h-6 w-6" />
        <span className="text-2xl font-semibold text-primary transition-colors duration-300">
          {appName}
        </span>
      </Link>
    </div>
  );
}