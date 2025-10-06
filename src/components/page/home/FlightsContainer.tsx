import { ArrowsRightLeftIcon } from "@heroicons/react/16/solid";
import LocationAutoComplete from "./LocationAutoComplete";

export default function FlightContainer() {
  return (
    <div className="flex items-center p-8">
      <LocationAutoComplete placeholder={"Leaving from"}></LocationAutoComplete>
      <div className="relative h-10 w-3">
        <button className="border-primary text-secondary absolute top-1/2 z-5 -mx-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full border bg-white p-1">
          <ArrowsRightLeftIcon></ArrowsRightLeftIcon>
        </button>
      </div>
      <LocationAutoComplete placeholder={"Going to"}></LocationAutoComplete>
    </div>
  );
}
