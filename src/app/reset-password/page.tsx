import { paths } from '@/config/paths';
import { ResetPasswordForm } from '@/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your Ecspedia account password using the token from your email.',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
    email?: string;
  }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token, email } = await searchParams;

  if (!token) {
    return (
      <>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md text-center">
              <h2 className="mb-4 text-xl font-semibold text-primary">Invalid Reset Link</h2>
              <p className="mb-4 text-sm text-secondary">
                This password reset link is invalid or has expired.
              </p>
              <a
                href={paths.forgotPassword.getHref()}
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

      <div className="mx-auto max-w-7xl px-4 py-8">
        <ResetPasswordForm token={token} email={email} />
      </div>
    </>
  );
}
