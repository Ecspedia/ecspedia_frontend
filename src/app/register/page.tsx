import { RegisterForm } from '@/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your Ecspedia account to manage bookings and access exclusive deals.',
};

export default function ExpediaHeader() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <RegisterForm />
      </div>
    </>
  );
}
