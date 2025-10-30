
import { HeaderNav } from '@/components/ui/Header';
import Register from '@/components/features/auth/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your Ecspedia account to manage bookings and access exclusive deals.',
};

export default function ExpediaHeader() {
  console.log('Register page');
  return (
    <>
      <HeaderNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Register />
      </div>
    </>
  );
}
