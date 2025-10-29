import { HeaderNav } from '@/components/ui/Header';
import { ResetPasswordForm } from '@/components/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your Ecspedia account password using the token from your email.',
};

interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = searchParams;

  if (!token) {
    return (
      <>
        <HeaderNav />
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md text-center">
              <h2 className="mb-4 text-xl font-semibold text-primary">Invalid Reset Link</h2>
              <p className="mb-4 text-sm text-gray-600">
                This password reset link is invalid or has expired.
              </p>
              <a 
                href="/forgot-password" 
                className="font-medium text-secondary hover:underline"
              >
                Request a new reset link
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <ResetPasswordForm token={token}  />
      </div>
    </>
  );
}
