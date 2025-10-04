import LocationAutoComplete from "@/components/features/home/LocationAutoComplete";
import ServiceSelector from "@/components/features/home/ServiceSelector";

export default function Home() {
  return (
    <div className="flex flex-col w-1/2 mx-auto border-1 border-primary-dark rounded-lg mt-10">
      <div className="flex flex-col items-center mx-auto mt-5">
        <ServiceSelector></ServiceSelector>
      </div>
      <hr className="w-full  border-t-1 border-primary-dark" />
      <div className="p-8">
        <LocationAutoComplete />
      </div>
    </div>
  );
}
