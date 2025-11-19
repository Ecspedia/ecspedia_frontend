import { LoginForm } from '@/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Ecspedia account to manage bookings and access exclusive deals.',
};

interface LoginPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { email } = await searchParams;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LoginForm email={email} />
      </div>
    </>
  );
}
