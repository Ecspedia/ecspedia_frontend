import { HeaderNav } from "@/components/ui/Header";
import Register from "@/components/ui/Register/RegisterForm";
export default function ExpediaHeader() {

  return (
    <>
      <HeaderNav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Register />
      </div>
    </>
  );
}