import { HeaderNav } from '@/components/ui/Header';
import { ForgotPasswordForm } from '@/components/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your Ecspedia account password. Enter your email to receive a password reset link.',
};

export default function ForgotPasswordPage() {
  return (
    <>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
