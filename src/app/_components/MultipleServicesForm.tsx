import { ServiceTabSelector } from "@/features/service-selector/components";
import ServiceSearchForm from "./ServiceSearchForm";


const MultipleServicesForm = () => {
    return (
        <div className="bg-cover bg-background bg-center border-0 lg:border lg:border-border mt-3 lg:mt-5 flex flex-col rounded-lg  ">
            <div className="w-full overflow-x-auto no-scrollbar">
                <ServiceTabSelector />
            </div>
            <hr className="border-border w-full border-t" />
            <ServiceSearchForm />
        </div>
    );
};

export default MultipleServicesForm;