import { LoginForm } from '@/components/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Ecspedia account to manage bookings and access exclusive deals.',
};

export default function LoginPage() {

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LoginForm />
      </div>
    </>
  );
}
