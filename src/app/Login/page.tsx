import { HeaderNav } from '@/components/ui/Header';
import { LoginForm } from '@/components/features/auth';
export default function ExpediaHeader() {
  return (
    <>
      <HeaderNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LoginForm />
      </div>
    </>
  );
}
