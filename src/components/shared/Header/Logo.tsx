import Link from "next/link";
import { MoveUpLeft } from "lucide-react";
import { paths } from '@/config/paths';

export default function Logo() {
    const appName = process.env.NEXT_PUBLIC_APP_NAME || "Ecspedia Dev";

    return (
        <div className="flex items-center space-x-4">
            <Link href={paths.home.getHref()} className="flex items-center gap-3">
                <div className="text-black bg-accent flex h-6 w-6 items-center justify-center rounded-md"
                >
                    <MoveUpLeft size={35} strokeWidth={2} />
                </div>
                <span className="text-primary text-2xl font-semibold transition-colors duration-300">
                    {appName}
                </span>
            </Link>
        </div>
    );
}