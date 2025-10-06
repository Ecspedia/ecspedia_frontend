import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import LocationAutoComplete from "./LocationAutoComplete";

export default function UserInputsContainer() {
  return (
    <div className="flex p-8 items-center">
      <LocationAutoComplete placeholder={"Leaving from"}></LocationAutoComplete>
      <div className="relative w-3 h-10">
        <button className="p-1 absolute z-5 top-1/2 -translate-y-1/2 rounded-full bg-white border border-primary text-secondary w-8 h-8 -mx-2 cursor-pointer">
          <ArrowsRightLeftIcon></ArrowsRightLeftIcon>
        </button>
      </div>
      <LocationAutoComplete placeholder={"Going to"}></LocationAutoComplete>
    </div>
  );
}
