import { HeaderNav } from "@/components/ui/Header";
import Link from "next/link";

export default function ExpediaHeader() {

    return (
        <>
            <HeaderNav />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 text-primary">Trips</h1>
                <div className="bg-secondary/5 p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        Your next adventure awaits when you sign in!
                    </h2>
                    <ul className="list-disc pl-5 text-primary/70 space-y-1">
                        <li>
                            Save money with Member Prices on thousands of hotels, activities, car rentals, and cruises
                        </li>
                        <li>
                            Plan and share trip details with your travel group
                        </li>
                        <Link
                            href="/Login"
                            className="inline-block px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
                        >
                            Sign In or Register
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}