import { HeaderNav } from '@/components/ui/Header';
import { ClientHomeLayout } from '@/components/layouts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search & Book Flights and Hotels',
  description: 'Find and book the best flights and hotels. Compare prices and get exclusive deals on your next trip.',
};

export default function Home() {
  return (
    <>

      <ClientHomeLayout />
    </>
  );
}
