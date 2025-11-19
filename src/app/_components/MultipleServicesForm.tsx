import { ServiceTabSelector } from "@/features/service-selector/components";
import ServiceSearchForm from "./ServiceSearchForm";


const MultipleServicesForm = () => {
    return (
        <div className="border-border mt-5 flex flex-col rounded-lg border">
            <div className="mx-auto">
                <ServiceTabSelector />
            </div>
            <hr className="border-border w-full border-t" />
            <ServiceSearchForm />
        </div>
    );
};

export default MultipleServicesForm;