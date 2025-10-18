import { HeaderNav } from '@/components/ui/Header';
import Register from '@/components/features/auth/RegisterForm';
export default function ExpediaHeader() {
  return (
    <>
      <HeaderNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Register />
      </div>
    </>
  );
}
