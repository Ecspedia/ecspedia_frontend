import Link from "next/link";
import { MoveUpLeft } from "lucide-react";
export default function Logo() {
    return (
        <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-3">
                <div className="text-primay bg-accent flex h-6 w-6 items-center justify-center rounded-md"
                >
                    <MoveUpLeft size={35} strokeWidth={2} />
                </div>
                <span className="text-primary text-2xl font-semibold transition-colors duration-300">
                    Ecspedia Dev
                </span>
            </Link>
        </div>
    );
}