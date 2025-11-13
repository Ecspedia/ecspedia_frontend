import { LoginForm } from '@/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Ecspedia account to manage bookings and access exclusive deals.',
};

interface LoginPageProps {
  searchParams: {
    email?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const { email } = searchParams;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LoginForm email={email} />
      </div>
    </>
  );
}
