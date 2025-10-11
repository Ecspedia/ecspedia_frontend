import ServiceNavigationTabs from "@/components/page/home/ServiceNavigationTabs";
import ServiceSearchForm from "@/components/page/home/ServiceSearchForm";
import { HeaderNav } from "@/components/ui/Header";

export default function Home() {
  return (
  <>
    <HeaderNav />
    <div className="border-primary mx-auto mt-10 flex w-3/5 flex-col rounded-lg border-1">
      <div className="mx-auto mt-5">
        <ServiceNavigationTabs></ServiceNavigationTabs>
      </div>
      <hr className="border-primary w-full border-t-1" />
      <ServiceSearchForm />
    </div>
  </>
  );
}
