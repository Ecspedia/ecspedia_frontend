import { HeaderNav } from '@/components/ui/Header';
import Link from 'next/link';

export default function ExpediaHeader() {
  return (
    <>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-primary mb-4 text-3xl font-bold">Trips</h1>
        <div className="bg-secondary/5 mb-6 rounded-lg p-6 shadow">
          <h2 className="text-primary mb-2 text-xl font-semibold">
            Your next adventure awaits when you sign in!
          </h2>
          <ul className="text-secondary list-disc space-y-1 pl-5">
            <li>
              Save money with Member Prices on thousands of hotels, activities, car rentals, and
              cruises
            </li>
            <li>Plan and share trip details with your travel group</li>
          </ul>
          <Link
            href="/login"
            className="bg-brand-secondary hover:bg-brand-secondary/90 mt-4 inline-block rounded-lg px-4 py-2 text-white transition"
          >
            Sign In or Register
          </Link>
        </div>
      </div>
    </>
  );
}
